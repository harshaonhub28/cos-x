const path = require("path");
const xlsx = require("xlsx");
const bodyParser = require("body-parser");
const fs = require("fs");

const { StudentModel } = require("../models/student.model");

const uploadStudents = (req, res) => {
  if (req.body.data) {
    let students = [];
    const schoolId = req.body.schoolId;
    //the excel file is converted in to base64 string and being sent
    const data = req.body.data;

    //Checking for directory existence, if not , creating the directory
    const fileLocation = path.join(
      __dirname,
      `../Students/${req.body.fileName}`
    );
    const dirname = path.dirname(fileLocation);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }

    //Decoding the base64 string directly using writeFile into a csv file
    const filePromise = new Promise((resolve, reject) => {
      fs.writeFile(fileLocation, data, { encoding: "base64" }, err => {
        if (err) {
          reject(err);
        }
        //data in object form through xlsx add-on
        let fileData = xlsx.readFile(fileLocation);
        resolve(fileData);
      });
    }).then(data => {
      try {
        let sheet = data.Sheets.Sheet1;
        let i = 2;
        while (sheet) {
          let studentName = sheet[`A${i}`].v;
          let standard = sheet[`B${i}`].v;
          let address = sheet[`C${i}`].v;
          let email = sheet[`D${i}`].v;
          let guardianContact = sheet[`E${i}`].v;

          let newStudent = {
            schoolId,
            studentName,
            standard,
            address,
            email,
            guardianContact
          };
          students.push(newStudent);
          i++;
          //end condition for the loop
          if (!sheet[`B${i}`]) {
            sheet = "";
          }
        }
        console.log(students);
        StudentModel.create(students, (err, studentArray) => {
          if (err) throw err;
          res.status(201).json({ message: "Students created" });
        });
      } catch (err) {
        if (err) throw err;
      }
    });
  }
};

const getStudents = (req, res) => {
  if (req.params.standard) {
    const standard = req.params.standard;

    StudentModel.find({ standard }, (err, studentArray) => {
      let studentsEdited = studentArray.map(student => {
        return {
          schoolId: student.schoolId,
          studentId: student._id,
          name: student.studentName,
          standard: student.standard,
          address: student.address,
          email: student.email,
          guardianContact: student.guardianContact
        };
      });
      res.json(studentsEdited);
    });
  }
};

module.exports = { uploadStudents, getStudents };

const path = require("path");
const xlsx = require("xlsx");
const bodyParser = require("body-parser");
const fs = require("fs");

const { TeacherModel } = require("../models/teacher.model");

const uploadTeachers = (req, res) => {
  if (req.body.data) {
    let teachers = [];
    const schoolId = req.body.schoolId;
    //the excel file is converted in to base64 string and being sent
    const data = req.body.data;

    //Checking for directory existence, if not , creating the directory
    const fileLocation = path.join(
      __dirname,
      `../Teachers/${req.body.fileName}`
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
        let fileData = xlsx.readFile(fileLocation);
        resolve(fileData);
      });
    }).then(data => {
      try {
        let sheet = data.Sheets.Sheet1;
        let i = 2;
        while (sheet) {
          let teacherName = sheet[`A${i}`].v;
          let department = sheet[`B${i}`].v;
          let address = sheet[`C${i}`].v;
          let email = sheet[`D${i}`].v;

          let newTeacher = {
            schoolId,
            teacherName,
            department,
            address,
            email
          };
          teachers.push(newTeacher);
          i++;
          //end condition for the loop
          if (!sheet[`B${i}`]) {
            sheet = "";
          }
        }
        console.log(teachers);
        TeacherModel.create(teachers, (err, teacherArray) => {
          if (err) throw err;
          res.status(201).json({ message: "Teachers created" });
        });
      } catch (err) {
        if (err) throw err;
      }
    });
  }
};

const getTeachers = (req, res) => {
  const schoolId = req.params.schoolId;
  TeacherModel.find({ schoolId }, (err, teacherArray) => {
    if (err) throw err;

    if (teacherArray.length) {
      const teachersEdited = teacherArray.map(teacher => {
        return {
          teacherId: teacher._id,
          teacherName: teacher.teacherName,
          department: teacher.department,
          address: teacher.address,
          email: teacher.email
        };
      });

      res.send(teachersEdited);
    } else {
      res.json({ message: "No teachers found" });
    }
  });
};

const assignTeacher = (req, res) => {
  if (req.body.teacherId && req.body.standard && req.body.duration) {
    const teacherId = req.body.teacherId;

    const assignedStandard = {
      standard: req.body.standard,
      duration: req.body.duration
    };
    TeacherModel.findById(teacherId, (err, teacher) => {
      if (err) throw err;
      teacher.set({ assignedStandard });
      teacher.save((err, assignedTeacher) => {
        if (err) throw err;
        console.log(assignedTeacher);
        res.json({ message: "Teacher assigned to the class" });
      });
    });
  }
};

module.exports = { uploadTeachers, getTeachers, assignTeacher };

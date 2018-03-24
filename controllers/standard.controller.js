const path = require("path");
const xlsx = require("xlsx");
const bodyParser = require("body-parser");
const fs = require("fs");

const { StandardModel } = require("../models/standard.model");

const uploadStandards = (req, res) => {
  if (req.body.data) {
    let standards = [];
    const schoolId = req.body.schoolId;
    //the excel file is converted in to base64 string and being sent
    const data = req.body.data;

    //Checking for directory existence, if not , creating the directory
    const fileLocation = path.join(
      __dirname,
      `../Standards/${req.body.fileName}`
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

        console.log(sheet);
        while (sheet) {
          let subjects = [];
          let sheetArray = ["B", "C", "D", "E", "F", "G", "H", "I"];
          let level = sheet[`A${i}`].v;

          for (let j = 0; j < sheetArray.length; j++) {
            let subject = sheet[sheetArray[j] + `${i}`];
            if (subject) {
              subjects.push(subject.v);
            } else break;
          }

          let standard = {
            level,
            subjects
          };
          standards.push(standard);

          i++;
          //end condition for the loop
          if (!sheet[`A${i}`]) {
            sheet = "";
          }
        }
        //console.log(standards);
        StandardModel.create({ schoolId, standards }, (err, StandardArray) => {
          if (err) throw err;
          res.status(201).json({ message: "Standards created" });
        });
      } catch (err) {
        if (err) throw err;
      }
    });
  }
};

module.exports = { uploadStandards };

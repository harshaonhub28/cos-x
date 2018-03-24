const mongoose = require("mongoose");
const uuid = require("uuid");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  schoolId: {
    type: String,
    required: true
  },
  //the teacher's userId which will be saved to this table when the teacher signs up
  teacherUserId: {
    type: String,
    default: uuid.v4,
    unique: true
  },
  teacherName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  //The standard which the teacher is assigned to, and the duration of the assignment
  assignedStandard: {
    type: {
      standard: String,
      duration: {
        type: String,
        enum: {
          values: ["Semester", "Year"],
          message: "Duration for the teacher required"
        }
      }
    }
  }
});

teacherSchema.set("timestamps", true);

const TeacherModel = mongoose.model("teacher", teacherSchema);

module.exports = { TeacherModel };

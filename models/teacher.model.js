const mongoose = require("mongoose");
const uuid = require("uuid/v4");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  schoolId: {
    type: String,
    required: true,
    default: uuidv4()
  },
  //the teacher's userId which will be saved to this table when the teacher signs up
  teacherUserId: {
    type: String,
    default: uuidv4(),
    unique: true
  },
  teacherName: {
    type: String,
    required: true,
    default: ""
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
    default: ""
  },
  //The class which the teacher is assigned to, and the duration of the assignment
  assignedClass: {
    type: {
      class: String,
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

const teacherModel = mongoose.model("teacher", teacherSchema);

module.exports = { teacherModel };

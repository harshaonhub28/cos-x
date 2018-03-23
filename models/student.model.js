const mongoose = require("mongoose");
const uuid = require("uuid");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  schoolId: {
    type: String,
    required: true
  },
  //the student's userId which will be saved to this table when the student signs up
  studentUserId: {
    type: String,
    default: uuid.v4,
    unique: true
  },
  studentName: {
    type: String,
    required: true
  },
  standard: {
    type: String,
    required: true,
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
  guardianContact: {
    type: String,
    default: ""
  }
});

studentSchema.set("timestamps", true);

const StudentModel = mongoose.model("student", studentSchema);

module.exports = { StudentModel };

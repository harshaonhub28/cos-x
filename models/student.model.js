const mongoose = require("mongoose");
const uuid = require("uuid/v4");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  schoolId: {
    type: String,
    required: true,
    default: uuidv4()
  },
  //the student's userId which will be saved to this table when the student signs up
  studentUserId: {
    type: String,
    default: uuidv4(),
    unique: true
  },
  studentName: {
    type: String,
    required: true,
    default: ""
  },
  class: {
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
  guardianContact: {
    type: String,
    default: ""
  }
});

studentSchema.set("timestamps", true);

const studentModel = mongoose.model("student", studentSchema);

module.exports = { studentModel };

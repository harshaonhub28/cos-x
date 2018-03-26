const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  schoolId: {
    type: String,
    default: ""
  },
  teacherId: {
    type: String,
    default: ""
  },
  standard: {
    type: String,
    default: ""
  },
  studentId: {
    type: String
  },
  internals: {
    type: [
      {
        subject: String,
        score: Number,
        _id: false
      }
    ]
  },
  projects: {
    type: [
      {
        subject: String,
        score: Number,
        _id: false
      }
    ]
  },
  termExams: {
    type: [
      {
        subject: String,
        score: Number,
        _id: false
      }
    ]
  },
  semExams: {
    type: [
      {
        subject: String,
        score: Number,
        _id: false
      }
    ]
  },
  practicals: {
    type: [
      {
        subject: String,
        score: Number,
        _id: false
      }
    ]
  },
  valid: {
    type: Boolean,
    default: true
  }
});

reportSchema.set("timestamps", true);

const ReportModel = mongoose.model("report", reportSchema);

module.exports = { ReportModel };

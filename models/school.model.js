const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  adminUserId: {
    type: String,
    required: true,
    unique: true
  },
  schoolName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

schoolSchema.set("timestamps", true);

const SchoolModel = mongoose.model("school", schoolSchema);

module.exports = { SchoolModel };

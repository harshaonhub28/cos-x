const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const standardSchema = new Schema({
  //school Id from the school schema
  schoolId: {
    type: String,
    required: true,
    unique: true
  },
  standards: {
    type: [
      {
        level: String,
        subjects: [String]
      }
    ]
  }
});

standardSchema.set("timestamps", true);

const StandardModel = mongoose.model("standard", standardSchema);

module.exports = { StandardModel };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const standardSchema = new Schema({
  //school Id from the school schema
  schoolId: {
    type: String,
    required: true,
    unique: true
  },
  standard: {
    type: [
      {
        standard: String,
        subjects: [
          {
            subject: String
          }
        ]
      }
    ]
  }
});

standardSchema.set("timestamps", true);

const StandardModel = mongoose.model("class", StandardSchema);

module.exports = { StandardModel };

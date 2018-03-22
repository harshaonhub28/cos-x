const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  //school Id from the school schema
  schoolId: {
    type: String,
    required: true,
    unique: true
  },
  class: {
    type: [
      {
        class: String,
        subjects: [
          {
            subject: String
          }
        ]
      }
    ]
  }
});

classSchema.set("timestamps", true);

const classModel = mongoose.model("class", classSchema);

module.exports = { classModel };

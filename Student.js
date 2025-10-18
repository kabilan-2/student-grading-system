const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  name: String,
  dob: String,
  subjects: [
    {
      subjectName: String,
      marks: Number
    }
  ]
});

module.exports = mongoose.model("Student", studentSchema);

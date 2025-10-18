const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const Student = require("./models/Student");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost:27017/gradingSystem")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ---------- FIXED ADMIN LOGIN ----------
app.post("/api/admin/login", (req, res) => {
  const { userId, password } = req.body;

  const fixedAdmin = {
    userId: "admin",
    password: "1234",
  };

  if (userId === fixedAdmin.userId && password === fixedAdmin.password) {
    res.json({ success: true, message: "Admin login successful" });
  } else {
    res.json({ success: false, message: "Invalid Admin ID or Password" });
  }
});

// ---------- ADMIN UPLOAD MARKS ----------
app.post("/api/admin/uploadMarks", async (req, res) => {
  try {
    const { rollNo, name, dob, subjects } = req.body;

    if (!rollNo || !name || !dob || !subjects) {
      return res.json({ success: false, message: "Missing student details" });
    }

    let student = await Student.findOne({ rollNo });

    if (!student) {
      student = new Student({ rollNo, name, dob, subjects });
    } else {
      student.name = name;
      student.dob = dob;
      student.subjects = subjects;
    }

    await student.save();
    res.json({ success: true, message: "✅ Marks uploaded successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------- STUDENT LOGIN ----------
app.post("/api/student/login", async (req, res) => {
  try {
    const { rollNo, dob } = req.body;
    const student = await Student.findOne({ rollNo, dob });

    if (student) {
      res.json({ success: true, student });
    } else {
      res.json({ success: false, message: "Invalid Roll No or DOB" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------- VIEW ALL UPLOADED STUDENT MARKS ----------
app.get("/api/admin/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, students });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching student records" });
  }
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);

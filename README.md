🎓 STUDENT GRADING SYSTEM

DESCRIPTION
q  The Student Grading System is a web-based platform designed to streamline and automate the management of student academic records. It allows administrators to add, update, delete, and view student marks efficiently, while providing students with an easy and secure way to check their results online.
  The system reduces manual effort, eliminates calculation errors, ensures data accuracy, and promotes transparency through centralized result management. This solution is ideal for schools, colleges, and coaching centers seeking a digital approach to academic evaluation.

TECHNOLOGY STACK

Frontend: HTML, CSS, JavaScript 
  HTML structures the web pages including forms, tables, and panels.
  CSS handles styling, colors, fonts, spacing, and responsive layouts.
  JavaScript manages interactivity, form validation, dynamic table updates, and total marks calculation.

Backend: Node.js, Express.js
  Node.js executes server-side logic and handles API requests.
  Express.js simplifies routing and RESTful API endpoint creation for CRUD operations.

Database: MongoDB (Mongoose)
  Stores student and admin data in a structured, flexible JSON-like format.
  Supports fast retrieval, updates, and ensures data integrity.

Utilities: CORS, Body-Parser
  Enables secure cross-origin requests and parses incoming JSON request bodies.

Deployment: GitHub Pages (Frontend), Render / Vercel (Backend)
  Makes the application accessible online without needing local servers.

PROBLEM STATEMENT
  Manual management of student grades is error-prone, inefficient, and time-consuming. Teachers face difficulties in:
    Updating student records accurately
    Calculating total marks manually
    Sharing results promptly with students
    Maintaining consistent and organized data
  The Student Grading System addresses these challenges by:
    Automating the upload and management of student records
    Ensuring accurate calculations through backend validation
    Providing real-time access for both administrators and students
    Maintaining a centralized, reliable database for academic data

FEATURES

Admin Panel
  Upload new student records including roll number, name, DOB, and subject-wise marks
  View all student records in a structured, tabular format
  Edit existing records to correct errors in student details or marks
  Delete outdated or duplicate student records
  Ensures data accuracy, consistency, and centralization

Student Panel
  Students can access their marks and total scores using their roll number
  Provides real-time updates from the backend database
  Offers a simple, intuitive interface for students
  Enhances transparency and eliminates dependency on manual mark sheets

VALIDATION & ACCURACY
  HTML5 and JavaScript form validations to ensure correct input
  Automatic calculation of total marks
  Prevents duplicate entries using backend checks

USER INTERFACE  
  Responsive design suitable for desktops, tablets, and mobile screens
  Interactive tables for easy review of student records
  Clean and user-friendly layout for both Admin and Student panels

DEPLOYMENT FEATURES
  Frontend hosted on GitHub Pages for easy access
  Backend hosted on Render / Vercel for API connectivity

PROJECT STRUCTURE

 STUDENT GRADING SYSTEM/
│
├── models/               
│   ├── Admin.js          # Schema for admin users (login credentials, roles)
│   └── Student.js        # Schema for student data (roll number, name, DOB, subjects, marks)
│
├── node_modules/         # Installed Node.js packages (auto-generated)
│
├── public/               # Frontend files
│   ├── admin.html        # Admin panel for managing student records
│   ├── index.html        # Homepage / landing page
│   ├── student.html      # Student panel to view marks and totals
│   ├── viewall.html      # Page to view all student records
│   ├── script.js         # JS for frontend interactivity and calculations
│   ├── viewall.js        # JS for handling viewall.html functionality
│   └── style.css         # CSS for all frontend pages
│
├── package.json          # Project metadata, dependencies, and scripts
├── package-lock.json     # Locks installed package versions
└── server.js             # Main Node.js server (Express setup, MongoDB connection, API routes)






// studentviewall.js — Show each subject + total marks
document.addEventListener("DOMContentLoaded", async () => {
  const tableHead = document.getElementById("tableHead");
  const tableBody = document.querySelector("#studentsTable tbody");

  try {
    const response = await fetch("http://localhost:3000/api/admin/students");
    const result = await response.json();

    if (!result.success) {
      tableBody.innerHTML = `<tr><td colspan="10">Error loading data.</td></tr>`;
      return;
    }

    const students = result.students;
    if (students.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="10">No records found.</td></tr>`;
      return;
    }

    // ✅ Collect all unique subjects
    const allSubjects = new Set();
    students.forEach(student => {
      if (student.subjects) {
        student.subjects.forEach(sub => allSubjects.add(sub.subjectName));
      }
    });

    const subjects = Array.from(allSubjects);

    // ✅ Build table header
    tableHead.innerHTML = `
      <tr>
        <th>Roll No</th>
        <th>Name</th>
        <th>Date of Birth</th>
        ${subjects.map(sub => `<th>${sub}</th>`).join("")}
        <th>Total Marks</th>
      </tr>
    `;

    // ✅ Fill table rows
    students.forEach(student => {
      let totalMarks = 0;
      let rowHTML = `
        <td>${student.rollNo}</td>
        <td>${student.name}</td>
        <td>${student.dob}</td>
      `;

      subjects.forEach(sub => {
        const found = student.subjects?.find(s => s.subjectName === sub);
        const mark = found ? found.marks : "-";
        if (found) totalMarks += Number(found.marks) || 0;
        rowHTML += `<td>${mark}</td>`;
      });

      rowHTML += `<td>${totalMarks}</td>`;

      const row = document.createElement("tr");
      row.innerHTML = rowHTML;
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Error fetching students:", error);
    tableBody.innerHTML = `<tr><td colspan="10">Failed to load data.</td></tr>`;
  }
});

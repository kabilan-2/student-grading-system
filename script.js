// ---------- ADMIN LOGIN ----------
async function adminLogin() {
  const userId = document.getElementById("adminUser").value.trim();
  const password = document.getElementById("adminPass").value.trim();

  // Fixed admin credentials
  if (userId === "admin" && password === "1234") {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    alert("❌ Invalid Admin ID or Password. Try again.");
  }
}

// ---------- STUDENT LOGIN ----------
async function studentLogin() {
  const rollNo = document.getElementById("rollNo").value.trim();
  const dob = document.getElementById("dob").value.trim();

  if (!rollNo || !dob) {
    alert("⚠️ Please enter Roll No and Date of Birth");
    return;
  }

  const res = await fetch("/api/student/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rollNo, dob })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("student", JSON.stringify(data.student));
    window.location.href = "student.html";
  } else {
    alert("❌ Invalid Roll No or Date of Birth");
  }
}

// ---------- ADD SUBJECT FIELD ----------
function addSubject() {
  const container = document.getElementById("subjects");
  const div = document.createElement("div");
  div.classList.add("subject-row");
  div.innerHTML = `
    <input placeholder="Subject Name">
    <input type="number" placeholder="Marks">
    <button onclick="removeSubject(this)">- Remove Subject</button>
  `;
  container.appendChild(div);
}

// ---------- REMOVE SUBJECT FIELD ----------
function removeSubject(button) {
  button.parentElement.remove();
}

// ---------- UPLOAD MARKS (ADMIN) ----------
async function uploadMarks() {
  const rollNo = document.getElementById("rollNo").value.trim();
  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value.trim();

  if (!rollNo || !name || !dob) {
    alert("⚠️ Please fill all student details.");
    return;
  }

  const subjects = [...document.querySelectorAll("#subjects .subject-row")].map(div => {
    const inputs = div.querySelectorAll("input");
    return {
      subjectName: inputs[0].value.trim(),
      marks: Number(inputs[1].value)
    };
  });

  if (subjects.length === 0) {
    alert("⚠️ Please add at least one subject.");
    return;
  }

  try {
    const res = await fetch("/api/admin/uploadMarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rollNo, name, dob, subjects })
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Marks uploaded successfully!");
      // Clear input fields after successful upload
      document.getElementById("rollNo").value = "";
      document.getElementById("name").value = "";
      document.getElementById("dob").value = "";
      document.getElementById("subjects").innerHTML = "";
    } else {
      alert("❌ Failed to upload marks. Try again.");
    }
  } catch (error) {
    console.error("Error uploading marks:", error);
    alert("⚠️ Error connecting to the server. Please try again later.");
  }
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem("student");
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "index.html";
}

// ---------- ACCESS CONTROL ----------
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("admin.html")) {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!adminLoggedIn) {
      alert("⚠️ Please login as admin first!");
      window.location.href = "index.html";
    }
  }

  if (window.location.pathname.includes("student.html")) {
    const student = localStorage.getItem("student");
    if (!student) {
      alert("⚠️ Please login as student first!");
      window.location.href = "index.html";
    }
  }
});
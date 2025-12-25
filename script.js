// TOGGLE
function showRegister(){
  document.getElementById("loginBox").classList.add("hide");
  document.getElementById("registerBox").classList.remove("hide");
}

function showLogin(){
  document.getElementById("registerBox").classList.add("hide");
  document.getElementById("loginBox").classList.remove("hide");
}

// REGISTER VALIDATION
const form = document.getElementById("signupForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.querySelector('input[name="role"]:checked');

  if (name === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Please fill all required fields");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email address");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!role) {
    alert("Please select your role");
    return;
  }

  alert(
    "Account Created Successfully!\n\n" +
    "Name: " + name + "\n" +
    "Email: " + email + "\n" +
    "Role: " + role.value
  );

  form.reset();
  showLogin();
});

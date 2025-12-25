/* =========================================================
   CONFIG
   ========================================================= */
const API_BASE = "http://localhost:5000/api";

/* =========================================================
   LOGIN / REGISTER TOGGLE
   ========================================================= */

function showRegister() {
  document.getElementById("loginBox").classList.add("hide");
  document.getElementById("registerBox").classList.remove("hide");
}

function showLogin() {
  document.getElementById("registerBox").classList.add("hide");
  document.getElementById("forgotBox").classList.add("hide");
  document.getElementById("otpBox").classList.add("hide");
  document.getElementById("newPassBox").classList.add("hide");
  document.getElementById("loginBox").classList.remove("hide");
}

/* =========================================================
   USERNAME VALIDATION (REGISTER)
   ========================================================= */

const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("usernameError");

if (usernameInput) {
  usernameInput.addEventListener("input", () => {
    const pattern = /^[a-zA-Z0-9_]{4,}$/;
    usernameError.style.display = pattern.test(usernameInput.value)
      ? "none"
      : "block";
  });
}

/* =========================================================
   REGISTER FORM (FRONTEND DEMO)
   ========================================================= */

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
      document.getElementById("confirmPassword").value;
    const role = document.querySelector('input[name="role"]:checked');

    if (!name || !username || !email || !password || !confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!role) {
      alert("Please select a role");
      return;
    }

    alert("Registration successful (frontend demo)");
    signupForm.reset();
    showLogin();
  });
}

/* =========================================================
   FORGOT PASSWORD FLOW (BACKEND CONNECTED)
   ========================================================= */

function showForgot() {
  document.getElementById("loginBox").classList.add("hide");
  document.getElementById("forgotBox").classList.remove("hide");
}

/* -------- SEND OTP (EMAIL / PHONE) -------- */
function resetPassword() {
  const email = document.getElementById("resetEmail").value.trim();
  const phone = document.getElementById("resetPhone").value.trim();

  if (!email && !phone) {
    alert("Please enter Email or Phone Number");
    return;
  }

  fetch(`${API_BASE}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, phone })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("forgotBox").classList.add("hide");
        document.getElementById("otpBox").classList.remove("hide");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    })
    .catch(() => alert("Server error while sending OTP"));
}

/* -------- VERIFY OTP -------- */
function verifyOTP() {
  const otp = document.getElementById("otpInput").value.trim();
  const email = document.getElementById("resetEmail").value.trim();
  const phone = document.getElementById("resetPhone").value.trim();

  if (!otp) {
    alert("Please enter OTP");
    return;
  }

  fetch(`${API_BASE}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otp, email, phone })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("otpBox").classList.add("hide");
        document.getElementById("newPassBox").classList.remove("hide");
      } else {
        alert("Invalid or expired OTP");
      }
    })
    .catch(() => alert("Server error while verifying OTP"));
}

/* -------- SAVE NEW PASSWORD -------- */
function saveNewPassword() {
  const password = document.getElementById("newPassword").value;
  const confirmPassword =
    document.getElementById("confirmNewPassword").value;
  const email = document.getElementById("resetEmail").value.trim();

  if (!password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  fetch(`${API_BASE}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Password reset successful");
        showLogin();
      } else {
        alert("Failed to reset password");
      }
    })
    .catch(() => alert("Server error while resetting password"));
}

/* =========================================================
   GOOGLE LOGIN (PLACEHOLDER – FIREBASE NEXT)
   ========================================================= */

function loginWithGoogle() {
  alert("Google Login clicked (Firebase integration next)");
}

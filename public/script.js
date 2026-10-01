const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const result = document.getElementById('result');

function clearMessages() {
  emailError.textContent = '';
  passwordError.textContent = '';
  result.textContent = '';
  result.className = 'result';
}

function validateClient(email, password) {
  let valid = true;

  if (!email.trim()) {
    emailError.textContent = 'Email cannot be empty.';
    valid = false;
  } else if (!email.includes('@')) {
    emailError.textContent = 'Email must contain an @ symbol.';
    valid = false;
  }

  if (!password) {
    passwordError.textContent = 'Password cannot be empty.';
    valid = false;
  } else if (password.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters long.';
    valid = false;
  }

  return valid;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearMessages();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!validateClient(email, password)) {
    result.textContent = 'Client-side validation blocked the submission.';
    result.className = 'result error';
    return;
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    // textContent intentionally treats the server message as text, not HTML.
    result.textContent = data.message;
    result.className = data.ok ? 'result success' : 'result error';
  } catch (error) {
    result.textContent = 'Unable to reach the server.';
    result.className = 'result error';
  }
});

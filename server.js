const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

function validateLogin(email, password) {
  if (typeof email !== 'string' || typeof password !== 'string') {
    return 'Email and password are required.';
  }

  const cleanEmail = email.trim();

  if (!cleanEmail || !password) {
    return 'Email and password cannot be empty.';
  }

  if (!cleanEmail.includes('@')) {
    return 'Email must contain an @ symbol.';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  return null;
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  const error = validateLogin(email, password);

  if (error) {
    return res.status(400).json({ ok: false, message: error });
  }

  // Demonstration only: no database or real authentication is performed.
  return res.status(200).json({
    ok: true,
    message: `Demo login accepted for ${email.trim()}. Server-side validation passed.`
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ ok: false, message: 'Invalid request.' });
});

app.listen(PORT, () => {
  console.log(`OWASP login demo running at http://localhost:${PORT}`);
});

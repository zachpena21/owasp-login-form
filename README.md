# OWASP Login Form — HW 2-B

A small login-form project created for a university cybersecurity assignment based on OWASP Juice Shop and the OWASP Top 10.

The application demonstrates:
- Email and password input fields
- Client-side validation that rejects empty fields, requires `@` in the email, and requires passwords to be at least 8 characters
- Server-side validation of the same requirements
- Safe rendering of server responses with `textContent`
- A simple local Express server with no real accounts or database

> Educational use only: this project is a local demonstration and does not contain real credentials or production authentication.

## Project Structure

```text
owasp-login-form/
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── server.js
├── package.json
└── README.md
```

## Requirements

- Node.js 18 or newer
- npm

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/zachpena21/owasp-login-form.git
   cd owasp-login-form
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in a browser.

## Validation Behavior

The browser validates the form before sending it to the server. The server independently repeats the validation because client-side validation can be bypassed.

A submission is rejected when:
- Email or password is empty
- Email does not contain `@`
- Password contains fewer than 8 characters

For valid demonstration input, the server returns a success message. The application intentionally does not connect to a user database or authenticate real credentials.

## Security Notes

Client-side validation improves usability but is not a security boundary. The server therefore validates all submitted data again. User-controlled values are displayed with the DOM `textContent` property so they are treated as text rather than executable HTML. A production authentication system would additionally use parameterized database queries, password hashing such as bcrypt, HTTPS, secure session management, and rate limiting.

## Part 3 Testing

For the assignment's exploitation section, the form can be tested with unexpected input in the local environment. The expected result is that malformed input is rejected or displayed as plain text rather than executed by the browser. This demonstrates why validation and safe output handling are important.

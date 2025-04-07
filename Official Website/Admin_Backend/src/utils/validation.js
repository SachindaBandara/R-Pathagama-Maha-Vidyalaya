const validator = require("validator");

const signUpValidation = (req) => {
  const { username, email, password } = req.body;

  // Ensure req.body is properly parsed
  if (
    !req.body ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!username) {
    throw new Error("Insert correct username!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Create a strong password!");
  }
};

module.exports = { signUpValidation };

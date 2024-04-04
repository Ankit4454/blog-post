const { hashSync, compareSync } = require("bcrypt");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const textValidator = /[<>\$"'`;^]/;
const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordValidator =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (textValidator.test(name)) {
    return res.status(400).json({
      error: true,
      message: "Special characters are not allowed",
    });
  }

  if (!emailValidator.test(email)) {
    return res.status(400).json({
      error: true,
      message: "Invalid email format",
    });
  }

  if (!passwordValidator.test(password)) {
    return res.status(400).json({
      error: true,
      message:
        "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.",
    });
  }

  try {
    const hashedPassword = await hashSync(password, 10);
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({
        error: true,
        message: "This email is already in use",
      });
    }
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      message: "Registration successful",
    });
  } catch (error) {
    console.log(`Error while creating a user ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!emailValidator.test(email)) {
    return res.status(400).json({
      error: true,
      message: "Invalid email format",
    });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(401).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await compareSync(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET_BLOG_POST,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      success: true,
      data: {
        token: token,
      },
      message: "You have successfully logged in",
    });
  } catch (error) {
    console.log(`Error while signing in ${error}`);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

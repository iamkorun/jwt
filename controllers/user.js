const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let error = false;

    if (!name || !email || !password) {
      error = true;
      res.json({
        error: true,
        message: "All input is required",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      error = true;
      res.json({
        error: true,
        message: "User already exist",
      });
    }

    // Hash password

    if (!error) {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.send({ message: "Register Successfully" });
    }
  } catch (e) {
    res.json({
      error: true,
      message: "Something went wrong",
    });
    console.log(e);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.json({
        error: true,
        message: "Invalid Username or Password",
      });
    }
  } catch (e) {
    res.json({
      error: true,
      message: "Something went wrong",
    });
    console.log(e);
  }
};

const userInfo = async (req, res) => {
  try {
    res.json({
      decoded: req.decoded,
    });
  } catch (e) {
    res.json({
      error: true,
      message: "Something went wrong",
    });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.PRIVATE_KEY, {
    expiresIn: "365d",
    algorithm: "RS256"
  });
};

module.exports = { userLogin, userRegister, userInfo };

const userModel = require("../Model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // check student
    const user = await userModel.findOne({ email: email });

    // if student doesn't exist
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found please register first",
      });
    }

    // check for password correction
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials. Please check your email and password",
      });
    }

    // generate token for authentication
    const token = jwt.sign({ user }, process.env.TOKEN_KEY);

    res.status(200).send({
      success: true,
      message: "Login Successfully..",
      token,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

module.exports = loginController;

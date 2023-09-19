const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user1 = await userModel.findOne({ email: email });

    // if user doesn't exist
    if (user1) {
      return res.status(409).send({
        success: false,
        message: "User is already registered using this email",
      });
    }

    // Password Hashing
    const saltRounds = 17;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //save the student in database
    const user = await userModel.create({
      email,
      password: hashedPassword,
    });

    // generate token for authentication
    const token = jwt.sign({ user }, process.env.TOKEN_KEY);

    if (user) {
      res.status(200).send({
        success: true,
        message: "User Registered Successfully..",
        token,
        user,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

module.exports = registerController;

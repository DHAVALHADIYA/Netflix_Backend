const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check admin
    const exisitingUser = await userModel.findOne({ email: email });

    //if admin exist
    if (exisitingUser) {
      return res.status(409).send({
        success: false,
        message: "Already Registered please login",
      });
    }

    // Password Hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //save the admin in database
    const user = await userModel.create({
      email,
      password: hashedPassword,
    });

    // generate token for authentication
    const token = jwt.sign({ user }, process.env.TOKEN_KEY);

    if (user) {
      res.status(201).send({
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

const userModel = require("../Model/userModel");
const OldUser = require("../Model/oldUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const oldUser = await OldUser.findOne({ email: email });

    if (oldUser) {
      const dltuser = await OldUser.findOneAndDelete({ email: email });

      if (dltuser) {
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
          return res.status(409).send({
            success: false,
            message: "Already Registered. Please login.",
          });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await userModel.create({
          email,
          password: hashedPassword,
        });

        const token = jwt.sign({ user }, process.env.TOKEN_KEY);

        if (user) {
          return res.status(201).send({
            success: true,
            message: "Welcome back....",
            token,
            user,
          });
        }
      }
    } else {
      const existingUser = await userModel.findOne({ email: email });

      if (existingUser) {
        return res.status(409).send({
          success: false,
          message: "Already Registered. Please login.",
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await userModel.create({
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ user }, process.env.TOKEN_KEY);

      if (user) {
        return res.status(201).send({
          success: true,
          message: "User Registered Successfully.",
          token,
          user,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

module.exports = registerController;

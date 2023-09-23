const OldUser = require("../Model/oldUserModel");

const oldUserController = async (req, res) => {
  try {
    const email = req.user.user.email;

    const exisitingUser = await OldUser.findOne({ email: email });

    if (exisitingUser) {
      return res.status(409).send({
        success: false,
        message: "Already exits in old user",
      });
    }

    const user = await OldUser.create({
      email,
    });

    if (user) {
      res.status(201).send({
        success: true,
        message: "User Registered Successfully in old account..",
        user,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in adding data",
      error,
    });
  }
};

module.exports = oldUserController;

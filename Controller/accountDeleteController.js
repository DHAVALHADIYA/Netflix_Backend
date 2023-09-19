const userModel = require("../Model/userModel.js");

const acoountDeleteController = async (req, res) => {
  try {
    const { email } = req.body;

    // check student
    const user = await userModel.findOne({ email: email });

    // if student doesn't exist
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found , you are not valid user",
      });
    } else {
      const result = await userModel.deleteOne({ email: email });
      if (!result) {
        res.status(503).send({
          success: false,
          message: "The server is down, Please try again later",
        });
      } else {
        res.status(200).send({
          success: true,
          message: "The account is deleted successfully",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching data",
      error,
    });
  }
};

module.exports = acoountDeleteController;

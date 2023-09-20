const userModel = require("../Model/userModel.js");
const favouritesModel = require("../Model/favouritesModel.js");

const acoountDeleteController = async (req, res) => {
  try {
    const email = req.user.user.email;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found , you are not valid user",
      });
    } else {
      const result = await favouritesModel.find({ email: email });
      if (!result) {
        res.status(503).send({
          success: false,
          message: "Error in accesing data",
        });
      } else {
        res.status(200).send({
          success: true,
          message: "data fetch successfully..",
          result,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server is down try again after some time",
      error,
    });
  }
};

module.exports = acoountDeleteController;

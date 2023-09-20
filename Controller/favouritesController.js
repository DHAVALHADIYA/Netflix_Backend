const favouritesModel = require("../Model/favouritesModel");
const userModel = require("../Model/userModel");

const favouriteController = async (req, res) => {
  try {
    const email = req.user.user.email;
    const movie = req.body;

    const exituser = await userModel.findOne({ email: email });

    if (exituser) {
      const user1 = await favouritesModel.findOne({ email: email });
      if (!user1) {
        const user = await favouritesModel.create({
          email,
          movie,
        });

        if (user) {
          res.status(200).send({
            success: true,
            message: "Favourites movies added been successfully..",
          });
        }
      } else {
        user1.movie.push(movie);

        await user1.save();

        if (user1) {
          res.status(200).send({
            success: true,
            message: "Favourites movies added been successfully..",
          });
        }
      }
    } else {
      res.status(404).send({
        success: false,
        message: "You are not valid user , login now",
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

module.exports = favouriteController;

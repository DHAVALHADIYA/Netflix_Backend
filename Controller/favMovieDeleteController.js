const favouritesModel = require("../Model/favouritesModel.js");

const favMovieDeleteController = async (req, res) => {
  try {
    const email = req.user.user.email;
    const movie = req.body;
    // console.log(movie);

    const user = await favouritesModel.findOne({ email: email });

    if (user) {
      const updatedMovies = user.movie.filter((m) => m.id !== movie.id);
      user.movie = updatedMovies;
      await user.save();

      res.status(200).send({
        success: true,
        message: "Movie is removed successfully..",
      });
    } else {
      res.status(404).send({
        success: false,
        message: "You are not valid user , login first",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server is down try again after some time",
      error,
    });
  }
};

module.exports = favMovieDeleteController;

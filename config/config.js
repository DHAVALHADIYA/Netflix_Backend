const mongoose = require("mongoose");

const netflix_db = async () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database Connection Successfully.....");
    })
    .catch((err) => {
      console.log("There will be some error due to ", err);
    });
};

module.exports = netflix_db;

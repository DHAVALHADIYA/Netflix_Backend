const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const netflix_db = require("./config/config");
netflix_db();

const userRoutes = require("./Routes/userRoutes");

const app = express();
const port = 5000 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRoutes);

mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("The backend is successfully deployed");
});


app.listen(port, () => {
  console.log("The server is listening on the port " + port);
});

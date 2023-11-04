// DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
const breadsController = require("./controllers/breads_controller.js");
const mongoose = require("mongoose");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const MONGO_URI = process.env.MONGO_URI;

// MIDDLEWARE
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Breads
app.use("/breads", breadsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to an Awesome App about Breads!");
});

// 404 Page
app.get("*", (req, res) => {
  res.send("404");
});

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected");
  } catch (e) {
    console.log("error");
  }

  // LISTEN
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
};
start();
module.exports = app;

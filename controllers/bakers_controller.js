// dependencies
const express = require("express");
const baker = express.Router();
const Baker = require("../models/baker.js");
const bakerSeedData = require("../models/baker_seed.js");

baker.get("/data/seed", async (req, res) => {
  await Baker.insertMany(bakerSeedData);
  res.redirect("/bread");
});

// export
module.exports = baker;

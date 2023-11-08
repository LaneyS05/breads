// dependencies
const express = require("express");
const baker = express.Router();
const Baker = require("../models/baker.js");
//const Breads = require("./bread");
const bakerSeedData = require("../models/baker_seed.js");

baker.get("/data/seed", async (req, res) => {
  await Baker.insertMany(bakerSeedData);
  res.redirect("/bread");
});

// Index:
baker.get("/", async (req, res) => {
  const bakers = await Baker.find();
  await Baker.populate(bakers, { path: "breads" });
  res.render("bakersIndex", { bakers });
});

// Show:
baker.get("/:id", async (req, res) => {
  const index = req.params.id;
  const baker = await Baker.findById(index);
  await baker.populate("breads");
  res.render("bakerShow", baker);
});

// export
module.exports = baker;

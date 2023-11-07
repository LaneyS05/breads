// dependencies
const express = require("express");
const baker = express.Router();
const Baker = require("../models/baker.js");
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
baker.get("/:id", (req, res) => {
  Baker.findById(req.params.id)
    .populate("breads")
    .then((foundBaker) => {
      res.render("bakerShow", {
        baker: foundBaker,
      });
    });
});

// export
module.exports = baker;

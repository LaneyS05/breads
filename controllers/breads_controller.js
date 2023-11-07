const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");
const Baker = require("../models/baker.js");

// NEW
breads.get("/new", async (req, res) => {
  const allBakers = await Baker.find();
  res.render("new", {
    bakers: allBakers,
    title: "creat new bread",
  });
});

// INDEX
breads.get("/", async (req, res) => {
  const allBreads = await Bread.find();

  res.render("index", {
    breads: allBreads,
    title: "index Page",
  });
});

// CREATE
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.create(req.body);
  res.redirect("/breads");
});

breads.get("/:id", (req, res) => {
  Bread.findById(req.params.id)
    .populate("baker")
    .then((foundBread) => {
      res.render("show", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      res.send("404");
    });
});

// EDIT
breads.get("/:id/edit", (req, res) => {
  Baker.find().then((foundBakers) => {
    Bread.findById(req.params.id).then((foundBread) => {
      res.render("edit", {
        bread: foundBread,
        bakers: foundBakers,
      });
    });
  });
});

// UPDATE
breads.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBread) => {
      console.log("updated bread", updatedBread);
      res.redirect(`/breads/${req.params.id}`);
    }
  );
});

// SHOW
breads.get("/:id", async (req, res) => {
  const id = req.params.od;
  const bread = await Bread.findById(id);
  const bakedBy = bread.getBakedBy();
  console.log(bakedBy);
  res.render("show", {
    bread,
    id,
  });
});

// DELETE
breads.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

module.exports = breads;

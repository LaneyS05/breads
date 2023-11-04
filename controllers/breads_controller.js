const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");

// NEW
breads.get("/new", (req, res) => {
  res.render("new");
});

// INDEX
//breads.get('/', (req, res) => {
//res.render('Index',
//{
//breads: Bread
//}
//)
// res.send(Bread)
//})

breads.get("/", async (req, res) => {
  const allBreads = await Bread.find();

  res.render("index", {
    breads: allBreads,
    title: "index Page",
  });
});

// CREATE
//breads.post('/', (req, res) => {
//console.log(req.body)
//if (!req.body.image) {
//req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
//}
//if(req.body.hasGluten === 'on') {
//req.body.hasGluten = true
//} else {
//req.body.hasGluten = false
//}
//Bread.push(req.body)
//res.redirect('/breads')
//})

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
    .then((foundBread) => {
      res.render("show", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      res.send("404");
    });
});

//Everything below is not being used

// EDIT
breads.get("/:indexArray/edit", (req, res) => {
  res.render("edit", {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray,
  });
});

// UPDATE
breads.put("/:arrayIndex", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread[req.params.arrayIndex] = req.body;
  res.redirect("/breads");
});

// SHOW
breads.get("/:arrayIndex", (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render("Show", {
      bread: Bread[req.params.arrayIndex],
      index: req.params.arrayIndex,
    });
  } else {
    res.render("404");
  }
});

// DELETE
breads.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

module.exports = breads;

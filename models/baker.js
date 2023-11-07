// require mongoose
const Bread = require("./bread");
const mongoose = require("mongoose");
// creating shorthand for the Schema constructor
const { Schema } = mongoose;

// schema
const bakerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Rachel", "Monica", "Chandler", "joey", "Ross", "Phoebe"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
    },
  },
  { toJSON: { virtuals: true } }
);

//Virtuals
bakerSchema.virtual("breads"),
  {
    ref: "Bread",
    localField: "_id",
    foreignField: "baker",
  };

// model and export
const Baker = mongoose.model("Baker", bakerSchema);

module.exports = Baker;

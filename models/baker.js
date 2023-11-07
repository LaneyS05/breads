// require mongoose
const mongoose = require("mongoose");
// creating shorthand for the Schema constructor
const { Schema } = mongoose;

// schema
const bakerSchema = new Schema({
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
});

// helper methods
//bakerSchema.methods.getBakedBy = function () {
//return `${this.name} was baked with love by ${this.baker}`;
//};

// model and export
const Baker = mongoose.model("Baker", bakerSchema);

module.exports = Baker;

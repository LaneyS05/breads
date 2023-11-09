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
    status: {
      type: String,
      default: "Employed",
      enum: ["Employed", "Fired", "Laid Off", "Quit"],
    },
  },
  { toJSON: { virtuals: true } }
);

//Virtuals
bakerSchema.virtual("breads", {
  ref: "Bread",
  localField: "_id",
  foreignField: "baker",
});

//HOOKS
bakerSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    console.log("running pre deleteOne");
    const baker = this;
    console.log(baker._id);
  }
);

// model and export
const Baker = mongoose.model("Baker", bakerSchema);

module.exports = Baker;

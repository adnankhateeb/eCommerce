const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
   productID: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
   userID: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
   reviewText: { type: String, required: false },
});

const Review = new mongoose.model("review", reviewSchema);

module.exports = Review;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   productName: { type: String, required: true },
   categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
   productImgLink: { type: String },
   productPrice: { type: Number },
   description: { type: String },
   rating: { type: Number, default: 0 },
});

const Product = new mongoose.model("product", productSchema);

module.exports = Product;

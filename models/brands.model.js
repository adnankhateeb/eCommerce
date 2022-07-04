const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
   products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
   brandName: { type: String, required: true },
});

const Brand = new mongoose.model("brand", brandSchema);

module.exports = Brand;

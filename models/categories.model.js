const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
   categoryName: { type: String, required: true },
   ancestorID: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
   parentID: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
});

const Category = new mongoose.model("category", categorySchema);

module.exports = Category;

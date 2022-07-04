const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
   {
      userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      productID: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
      quantity: { type: Number, required: false, default: 1 },
   },
   {
      versionKey: false,
      timestamps: true,
   }
);

const Orders = new mongoose.model("order", orderSchema);

module.exports = Orders;

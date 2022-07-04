const express = require("express");
const mongoose = require("mongoose");
const userController = require("./controllers/user.controller");
const brandController = require("./controllers/brand.controllers");
const productController = require("./controllers/products.controller");
const categoryController = require("./controllers/category.controller");
const reviewController = require("./controllers/reviews.controller");
const orderController = require("./controllers/orders.controller");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
   try {
      res.send({ message: "RUNNING" });
   } catch (error) {
      return res.send({ error: error });
   }
});

app.use("/users", userController);
app.use("/brands", brandController);
app.use("/products", productController);
app.use("/categories", categoryController);
app.use("/reviews", reviewController);
app.use("/orders", orderController);
module.exports = app;

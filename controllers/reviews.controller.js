const express = require("express");

const router = express();
const Review = require("../models/reviews.model");
const Products = require("../models/products.model");
const User = require("../models/users.model");

router.get("/:productID", async (req, res) => {
   try {
      const productID = req.params.productID;

      const reviews = await Review.find({ productID: productID })
         .populate("userID")
         .lean()
         .exec();

      return res.status(200).send({ reviews });
   } catch (error) {
      return res.send(500).send({ error: error });
   }
});

router.post("/:productID", async (req, res) => {
   try {
      const productID = req.params.productID;
      
      const found = await Products.findById({ _id: productID }).lean().exec();
      if (!found) {
         return res.status(404).send("Product Not Found");
      }

      const review = await Review.create({
         productID: productID,
         userID: req.body.userID,
         reviewText: req.body.reviewText,
      });
      console.log(review);

      return res.status(201).send({ review });
   } catch (error) {
      return res.send(500).send({ error: error });
   }
});

router.delete("/:id", async (req, res) => {
   try {
      const review = await Review.findByIdAndDelete(req.params.id);

      return res.status(200).send({ review });
   } catch (error) {
      return res.send(500).send({ error: error });
   }
});

module.exports = router;

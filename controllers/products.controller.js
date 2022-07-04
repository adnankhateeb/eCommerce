const express = require("express");

const router = express();
const Products = require("../models/products.model");
const Categories = require("../models/categories.model");

router.get("/", async (req, res) => {
   try {
      const products = await Products.find().lean().exec();

      return res.status(200).send(products);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.post("/create", async (req, res) => {
   try {
      const product = await Products.create(req.body);

      return res.status(200).send(product);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.get("/:id", async (req, res) => {
   try {
      const product = await Products.findById(req.params.id);

      if (!product) {
         return res.status(404).send({ message: "No such product found" });
      }
      return res.status(200).send(product);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.patch("/:id/edit", async (req, res) => {
   try {
      const productId = req.params.id;
      const product = await Products.findById(req.params.id);

      if (!product) {
         return res.status(404).send({ message: "No user found" });
      }
      const findCategories = await Products.findByIdAndUpdate(
         productId,
         {
            $addToSet: {
               categories: req.body.categories || product.categories,
            },
            productName: req.body.productName || product.productName,
            productImgLink: req.body.productImgLink || product.productImgLink,
            description: req.body.description || product.description,
         },
         { new: true}
      );

      return res.status(200).send(findCategories);
   } catch (error) {
      console.log("error:", error);
      return res.status(500).send({ error: error });
   }
});

module.exports = router;

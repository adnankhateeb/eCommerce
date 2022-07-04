const express = require("express");

const router = express();
const Category = require("../models/categories.model");

router.get("/", async (req, res) => {
   try {
      const categories = await Category.find().lean().exec();

      return res.status(200).send(categories);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.post("/create", async (req, res) => {
   try {
      const catName = req.body.categoryName;

      const cat = await Category.findOne({ categoryName: catName });
      if (cat) {
         return res.status(400).send({ message: "Category already exists" });
      }
      const category = await Category.create(req.body);

      return res.status(200).send(category);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

module.exports = router;

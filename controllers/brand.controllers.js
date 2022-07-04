const express = require("express");

const router = express.Router();

const Brands = require("../models/brands.model");

router.get("/", async (req, res) => {
   try {
      const brand = await Brands.find().populate("products").lean().exec();

      return res.status(200).send(brand);
   } catch (error) {
      console.log("error:", error);
      return res.status(500).send({ error: error });
   }
});

router.post("/create", async (req, res) => {
   try {
      const brandName = req.body.brandName;

      const brand = await Brands.findOne({ brandName: brandName });
      console.log("brand:", brand);
      if (brand) {
         return res.status(400).send({ message: "Brand already exists" });
      }

      const newBrand = await Brands.create(req.body);

      return res.status(201).send(newBrand);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.get("/:id", async (req, res) => {
   try {
      const brand = await Brands.findById(req.params.id)
         .populate("products")
         .lean()
         .exec();

      console.log(brand);

      if (!brand) {
         return res.status(404).send({ message: "No such brand found" });
      }
      return res.status(200).send(brand);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.patch("/:id/edit", async (req, res) => {
   try {
      const brandId = req.params.id;
      const brand = await Brands.findById(brandId);
      console.log("brandId:", brandId);

      if (!brand) {
         return res.status(404).send({ message: "No such brand found" });
      }

      editBrand = await Brands.findByIdAndUpdate(
         brandId,
         {
            $addToSet: {
               products: req.body.products || brand.products,
            },
            brandName: req.body.brandName || brand.brandName,
         },
         {
            new: true,
         }
      );

      return res.status(200).send(editBrand);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.delete("/:id/del", async (req, res) => {
   try {
      const brand = await Brands.findByIdAndDelete(req.params.id);

      return res.status(200).send({ brand });
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

module.exports = router;

const express = require("express");
const router = express();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Orders = require("../models/orders.model");

router.get("/", async (req, res) => {
   try {
      const orders = await Orders.find().lean().exec();

      return res.status(200).send(orders);
   } catch (error) {
      return res.sendStatus(500).send({ message: error });
   }
});

router.post("/create", async (req, res) => {
   try {
      const userID = req.body.userID;
      console.log("userID:", userID);
      const userOrder = await Orders.findOne({ userID: userID });
      console.log("userOrder:", userOrder);

      if (userOrder) {
         const order = await Orders.findByIdAndUpdate(userOrder, {
            $push: {
               productID: req.body.productID,
            },
         });
         return res.status(200).send(order);
      } else {
         const order = await Orders.create(req.body);
         console.log("order:", order);
         return res.status(200).send(order);
      }
   } catch (error) {
      return res.status(500).send({ message: error });
   }
});

router.get("/:userID", async (req, res) => {
   try {
      const userID = req.params.userID;
      console.log("userID:", userID);

      const orders = await Orders.findOne({ userID: userID })
         .populate("productID")
         .lean()
         .exec();

      if (!orders) {
         return res.status(200).send("No Orders Found");
      }
      const total = await Orders.aggregate([
         {
            $match: { userID: ObjectId(userID) },
         },

         {
            $lookup: {
               from: "products",
               localField: "productID",
               foreignField: "_id",
               as: "Products",
            },
         },
         {
            $project: {
               _id: 0,
               total: { $sum: "$Products.productPrice" },
            },
         },
      ]);
      const sum = total[0].total;

      return res.status(200).json({ orders, sum });
   } catch (error) {
      console.log("error:", error);
      return res.status(500).send({ message: error });
   }
});

router.get("/all/stats", async (req, res) => {
   const date = new Date();
   const lastYear = new Date(date.setMonth(date.getMonth() - 12));

   try {
      const totalSales = await Orders.aggregate([
         { $match: { createdAt: { $gte: lastYear } } },
         {
            $lookup: {
               from: "products",
               localField: "productID",
               foreignField: "_id",
               as: "Products",
            },
         },
         {
            $project: {
               month: { $month: "$createdAt" },
               sales: { $sum: "$Products.productPrice" },
               count: { $sum: 1 },
            },
         },

         {
            $group: {
               _id: "$month",
               total: { $sum: "$sales" },
               count: { $sum: "$count" },
            },
         },
         {
            $sort: {
               _id: 1,
            },
         },
      ]);
      console.log(totalSales);
      return res.status(200).json(totalSales);
   } catch (err) {
      console.log("err:", err);
      return res.status(500).json(err);
   }
});

router.delete("/delete/:id", async (req, res) => {
   try {
      const order = await Orders.findByIdAndDelete(req.params.id);

      return res.status(200).send({ order });
   } catch (error) {
      return res.status(500).send({ message: error });
   }
});

module.exports = router;

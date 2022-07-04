const express = require("express");

const router = express.Router();

const User = require("../models/users.model");

router.get("/", async (req, res) => {
   try {
      const users = await User.find().lean().exec();

      return res.status(200).send({ users: users });
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.post("/create", async (req, res) => {
   // console.log(req.body);
   try {
      const user = await User.create(req.body);
      // console.log("user:", user);

      return res.status(200).send({ user: user });
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.get("/:id", async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      // console.log("user:", user)

      return res.status(200).send(user);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.patch("/:id/edit", async (req, res) => {
   try {
      const user_id = req.params.id;
      const user = await User.findById(req.params.id);

      if (!user) {
         return res.status(404).send({ message: "No user found" });
      }

      const editUser = await User.findByIdAndUpdate(
         user_id,
         {
            $addToSet: {
               address: req.body.address || user.address,
            },
            email: req.body.email || user.email,
            name: req.body.name || user.name,
         },
         { new: true }
      );

      return res.status(200).send(editUser);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.get("/:id/addresses", async (req, res) => {
   try {
      const user_id = req.params.id;
      const user = await User.findById(req.params.id);

      if (!user) {
         return res.status(404).send({ message: "No user found" });
      }

      const foundUser = await User.findById(user_id);

      return res.status(200).send(foundUser.address);
   } catch (error) {
      return res.status(500).send({ error: error });
   }
});

router.post("/:id/addresses/create", async (req, res) => {
   try {
      const user_id = req.params.id;
      const user = await User.findById(req.params.id);

      if (!user) {
         return res.status(404).send({ message: "No user found" });
      }
      const findAddress = await User.findByIdAndUpdate(
         user_id,
         {
            $addToSet: {
               address: req.body.address,
            },
            email: req.body.email || user.email,
            name: req.body.name || user.name,
         },
         { new: true }
      );

      return res.status(200).send(findAddress);
   } catch (error) {
      console.log("error:", error);
      return res.status(500).send({ error: error });
   }
});

// router.post("/:id/addresses/:idx/edit", async (req, res) => {
//     try {
//        const user_id = req.params.id;
//        const user = await User.findById(req.params.id);
//        const idx = req.params.idx;

//        if (!user) {
//           return res.status(404).send({ message: "No user found" });
//        }
//        const findAddress = await User.findByIdAndUpdate(
//           user_id,
//           {
//              $push: {
//                 address: req.body,
//              },
//           },
//           { new: true, upsert: true }
//        );

//        return res.status(200).send(findAddress);
//     } catch (error) {
//        console.log("error:", error)
//        return res.status(500).send({ error: error });
//     }
//  });

module.exports = router;

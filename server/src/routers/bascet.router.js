const express = require("express");
const { Bascet, User } = require("../../db/models");

const checkId = require("../middlewares/checkId");
const checkFields = require("../middlewares/checkFields");
const { Router } = require("express");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const bascets = await Bascet.findAll();
      res.json(bascets);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { usermail } = req.body;
      console.log('=====>',usermail);
      const user = await User.findOne({ where: { email: usermail } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await Bascet.create({
        ...req.body,
        userId: user.id,
      });
      // return res.json(newBascet);
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const bascet = await Bascet.findByPk(id);
      if (!bascet) {
        return res.status(404).json({ message: "Bascet not found" });
      }
      return res.json(bascet);
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const bascet = await Bascet.findByPk(id);
      if (!bascet) {
        return res.status(404).json({ message: "Bascet not found" });
      }

      await Bascet.destroy({ where: { id } });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });
// .patch(checkId, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const updateData = {};
//     for (const key in req.body) {
//       if (req.body[key]) {
//         updateData[key] = req.body[key];
//       }
//     }

//     await Bascet.update(updateData, { where: { id } });
//     const updatedBascet = await Bascet.findByPk(id);
//     res.json(updatedBascet);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;

const express = require("express");
const { Order, User } = require("../../db/models");

const checkId = require("../middlewares/checkId");
const checkFields = require("../middlewares/checkFields");
const { Router } = require("express");

const router = express.Router();

router
  .route("/:userMail")
  .get(async (req, res) => {
    const { userMail } = req.params;
    const user = await User.findOne({ where: { email: userMail } });
    try {
      const orders = await Order.findAll({ where: { userId: user.id } });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { usermail } = req.body;
      console.log("=====>", usermail);
      const user = await User.findOne({ where: { email: usermail } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newItem = await Order.create({
        ...req.body,
        userId: user.id,
      });
      return res.json(newItem);
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });

router
  .route("/:userMail/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await Order.destroy({ where: { id } });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;

      const updateData = {};
      for (const key in req.body) {
        if (req.body[key]) {
          updateData[key] = req.body[key];
        }
      }
      //console.log('patchserver====>',updateData)

      await Order.update(updateData, { where: { id } });
      const updatedOrder = await Order.findByPk(id);
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;

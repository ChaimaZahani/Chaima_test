const express = require("express");
const { Order } = require("./models/Order");
const authMiddleware = require("./middleware/auth");

const router = express.Router();

// Get all orders (for admin or authorized users)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find(); // You may want to filter by user if needed
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single order by ID (for users to view their orders)
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new order
router.post("/", authMiddleware, async (req, res) => {
  const order = new Order(req.body);
  try {
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an order (e.g., change status or details)
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an order (for admin or user)
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

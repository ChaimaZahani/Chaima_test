
const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  imageUrl: String,
});

// Create a model from the schema
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };

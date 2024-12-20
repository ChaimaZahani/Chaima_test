const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Make sure to load environment variables from a .env file

// Import routes
const productRoutes = require("./productRoutes"); // Import product routes from your previous code
const userRoutes = require("./usersRoutes"); // Import user routes from your previous code
const orderRoutes = require("./orderRoutes"); 

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) if needed

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Routes
app.use("/api/products", productRoutes); 
app.use("/api/users", userRoutes); 
app.use("/api/orders", orderRoutes); 
// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Handle undefined routes (404)
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

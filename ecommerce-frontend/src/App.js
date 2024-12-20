import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";
import OrderSummary from "./pages/OrderSummary";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage if exists
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/order" element={<OrderSummary />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/card" element={<CartPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

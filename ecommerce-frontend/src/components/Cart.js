import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const CartCard = () => {
  const [cartItems, setCartItems] = useState([]);
 const navigate = useNavigate();
  // Function to calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Function to update the cart in localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  

  // Handle removing items from the cart by ID
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  // Handle increasing the quantity of an item by ID
  const handleIncreaseQuantity = (itemId) => {
    console.log(itemId); 
    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  // Handle decreasing the quantity of an item by ID
  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };
 const handleProceedToSummary = () => {
   navigate("/order"); // This will navigate to the /order page
 };
  return (
    <div className="cart-container w-96 bg-white shadow-lg rounded-lg p-4 m-24">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div
              key={item._id} // Ensure that `key` is set here, which uniquely identifies each item in the list
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex items-center">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => handleDecreaseQuantity(item._id)}
                  >
                    -
                  </button>
                  <span className="text-sm text-gray-800">{item.quantity}</span>
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => handleIncreaseQuantity(item._id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold text-gray-800">Total:</span>
        <span className="text-lg font-semibold text-gray-800">
          ${calculateTotalPrice().toFixed(2)}
        </span>
      </div>
      <button
        onClick={handleProceedToSummary}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        type="button"
      >
        Proceed to Summary
      </button>
    </div>
  );
};

export default CartCard;

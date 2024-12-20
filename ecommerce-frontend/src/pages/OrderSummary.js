
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const OrderSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingCost] = useState(5.99); 
  const [discount] = useState(10); 

  // Calculate total price before discount and shipping
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Calculate the discount amount
  const calculateDiscount = (subtotal) => {
    return (subtotal * discount) / 100;
  };

  // Calculate the final total (subtotal - discount + shipping cost)
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscount(subtotal);
    return subtotal - discountAmount + shippingCost;
  };

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <>
      {" "}
      <Header></Header>
      <div className="order-summary-container w-96 bg-white shadow-lg rounded-lg p-4 m-24">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 ">
          Order Summary
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="order-items">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Items</h3>
            {cartItems.map((item) => (
              <div
                key={item.id}
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
                <p className="text-sm font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="order-summary mt-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-semibold text-gray-800">
              Subtotal:
            </span>
            <span className="text-sm font-semibold text-gray-800">
              ${calculateSubtotal().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-semibold text-gray-800">
              Discount:
            </span>
            <span className="text-sm font-semibold text-gray-800">
              -${calculateDiscount(calculateSubtotal()).toFixed(2)} ({discount}
              %)
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-semibold text-gray-800">
              Shipping:
            </span>
            <span className="text-sm font-semibold text-gray-800">
              ${shippingCost.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-lg font-semibold text-gray-800">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;

import React from "react";

const ProductDetails = ({ product, setCartItems, cartItems =  [] }) => {
      const products = { ...product };

  // Function to handle adding products to the cart
  const handleAddToCart = (product) => {
    // Get cart items from localStorage or initialize to an empty array if not present
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = storedCartItems.findIndex(
      (item) => item.id === product._id
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update its quantity
      storedCartItems[existingProductIndex].quantity += 1;
    } else {
      // If the product doesn't exist, add it with quantity 1
      storedCartItems.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
  };


  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img className="w-full" alt="img " src={products.imageUrl} />
      </div>

      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
            {products.name}
          </h1>
        </div>

        <div>
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
            {products.description}
          </p>
        </div>

        {/* Button to add the products to the cart */}
        <button
          onClick={() => handleAddToCart(products)}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

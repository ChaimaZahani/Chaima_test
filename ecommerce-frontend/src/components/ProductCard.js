import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
  // State for search text and filter criteria (e.g., minimum price)
  const [searchText, setSearchText] = useState("");
  const [filterPrice, setFilterPrice] = useState(0);

  // Filter products based on search text and price
  const filteredProducts = products.filter((product) => {
    const isPriceMatch = product.price >= filterPrice;
    const isSearchMatch =
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase());
    return isPriceMatch && isSearchMatch;
  });
  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };
  const getFirstWords = (text, wordLimit) => {
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xl p-4">
        {/* Filter Controls */}
        <div className="mb-4">
          {/* Search Input */}
          <div className="mb-2">
            <label
              htmlFor="search"
              className="text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Price Filter */}
          <div>
            <label
              htmlFor="priceFilter"
              className="text-sm font-medium text-gray-700"
            >
              Minimum Price: ${filterPrice}
            </label>
            <input
              type="range"
              id="priceFilter"
              min="0"
              max="500"
              step="10"
              value={filterPrice}
              onChange={(e) => setFilterPrice(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
        </div>

        {/* Product Cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[250px]"
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-60">
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/300"} // Using product image or a placeholder
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-blue-gray-900">
                      {product.name}
                    </p>
                    <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${product.price}
                    </p>
                  </div>
                  <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {getFirstWords(product.description, 2)}
                  </p>
                </div>
                <div className="p-4 pt-0">
                 
                  <button
                    onClick={() => handleViewDetails(product._id)}
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">
              No products match the search or filter criteria.
            </p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;

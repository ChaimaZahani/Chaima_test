import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/product";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); 
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts(); 
  }, []); 
console.log(products);
  return (
    <div>
      <Header></Header>
      {loading && (
        <div className="text-center text-gray-500">
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500">
          <h2>Error: {error}</h2>
        </div>
      )}
      {!loading && !error && <ProductCard products={products} />}
    </div>
  );
}

export default HomePage
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import ProductDetails from '../components/ProductDetail';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/product';

const ProductPage = ({ setCartItems }) => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    // Define the async function inside the useEffect hook
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id); // Fetch product by id
        setProduct(data); // Set the product data
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchProduct function
    fetchProduct();
  }, [id]);
  console.log(product);
  return (
    <div>
      <Header></Header>
      <div className="mt-10">
        {" "}
        <ProductDetails
          product={product}
          setCartItems={{ setCartItems }}
        ></ProductDetails>
      </div>
    </div>
  );
};

export default ProductPage
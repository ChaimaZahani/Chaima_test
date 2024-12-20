import axios from "axios";

const API_URL = "http://localhost:5000";

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/api/cart`, {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

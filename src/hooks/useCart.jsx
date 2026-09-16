import { useEffect, useState } from "react";
import { getCarts } from "../api/dummyjson.js";
const useCarts = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCarts();
        setCart(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);
  return { cart, loading, error };
};

export default useCarts;

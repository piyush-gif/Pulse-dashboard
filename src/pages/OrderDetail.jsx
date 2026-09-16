import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCartById } from "../api/dummyjson.js";
import "../styling/orderDetail.css";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getCartById(id);
        setOrder(data);
      } catch (err) {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link to="/orders" className="back-link">
        ← Back to Orders
      </Link>
      <h1>Order #{order.id}</h1>

      <div className="order-summary">
        <div>
          <p className="stat-label">User ID</p>
          <p className="stat-value">{order.userId}</p>
        </div>
        <div>
          <p className="stat-label">Total</p>
          <p className="stat-value">${order.total}</p>
        </div>
      </div>

      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;

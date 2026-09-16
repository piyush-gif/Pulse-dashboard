import useCart from "../hooks/useCart.jsx";
import { Link } from "react-router-dom";
import "../styling/orders.css";

const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];

const Orders = () => {
  const { cart, loading, error } = useCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Items</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((order) => {
            const status = statuses[order.id % statuses.length];
            return (
              <tr key={order.id}>
                <td>
                  <Link to={`/orders/${order.id}`}>#{order.id}</Link>
                </td>
                <td>{order.userId}</td>
                <td>{order.totalProducts}</td>
                <td>${order.total}</td>
                <td>
                  <span
                    className={`status-badge status-${status.toLowerCase()}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

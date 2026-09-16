import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1>Pulse</h1>
      </div>
      <div className="sidebar-links">
        <Link to="/">Overview</Link>
        <Link to="/products">Products</Link>
        <Link to="/users">Users</Link>
        <Link to="orders">Orders</Link>
      </div>
    </div>
  );
};

export default Sidebar;

import { NavLink } from "react-router-dom";
import "../styling/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h1>Pulse</h1>
      <div className="sidebar-links">
        <NavLink to="/" end>
          Overview
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/users">Users</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

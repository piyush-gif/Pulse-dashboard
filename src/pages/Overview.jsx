import StatCard from "../components/StatCard";
import useCart from "../hooks/useCart.jsx";
import useProducts from "../hooks/useProducts.jsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "../styling/overview.css";

const Overview = () => {
  const { products, loading: productsLoading } = useProducts();
  const { cart, loading: cartsLoading } = useCart();

  if (productsLoading || cartsLoading) return <p>Loading...</p>;

  const totalOrders = cart.length;
  const totalRevenue = cart.reduce((sum, c) => sum + c.total, 0);
  const totalProducts = products.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const priceRanges = [
    { label: "$0-25", min: 0, max: 25 },
    { label: "$25-50", min: 25, max: 50 },
    { label: "$50-100", min: 50, max: 100 },
    { label: "$100-200", min: 100, max: 200 },
    { label: "$200+", min: 200, max: Infinity },
  ];

  const priceRangeData = priceRanges.map(({ label, min, max }) => ({
    range: label,
    count: products.filter((p) => p.price >= min && p.price < max).length,
  }));

  return (
    <div>
      <h1>Overview</h1>
      <div className="stat-grid">
        <StatCard label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Products" value={totalProducts} />
        <StatCard label="Avg Order" value={`$${avgOrderValue.toFixed(2)}`} />
      </div>

      <div className="chart-row">
        <div className="chart-panel">
          <h2>Top Categories</h2>
          <BarChart width={380} height={250} data={categoryData}>
            <XAxis dataKey="category" stroke="#5C6B7A" fontSize={12} />
            <YAxis stroke="#5C6B7A" fontSize={12} />
            <Tooltip />
            <Bar dataKey="count" fill="#B5762A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>

        <div className="chart-panel">
          <h2>Products by Price Range</h2>
          <BarChart width={380} height={250} data={priceRangeData}>
            <XAxis dataKey="range" stroke="#5C6B7A" fontSize={12} />
            <YAxis stroke="#5C6B7A" fontSize={12} />
            <Tooltip />
            <Bar dataKey="count" fill="#B5762A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Overview;

import StatCard from "../components/StatCard";
import useCart from "../hooks/useCart.jsx";
import useProducts from "../hooks/useProducts.jsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

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
      <div>
        <StatCard label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Products" value={totalProducts} />
        <StatCard label="Avg Order" value={`$${avgOrderValue.toFixed(2)}`} />
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h2>Top Categories</h2>
          <BarChart width={380} height={250} data={categoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3D5A47" />
          </BarChart>
        </div>

        <div>
          <h2>Products by Price Range</h2>
          <BarChart width={380} height={250} data={priceRangeData}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8A8F5C" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Overview;

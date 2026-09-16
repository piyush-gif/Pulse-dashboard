import StatCard from "../components/StatCard";

const Overview = () => {
  const totalOrders = 3;
  const totalRevenue = 2000;
  const totalProducts = 5;
  const avgOrderValue = 100;

  return (
    <div>
      <h1>Overview</h1>
      <div>
        <StatCard label="Total Revenue" value={`$${totalRevenue}`} />
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Products" value={totalProducts} />
        <StatCard label="Avg Order" value={`$${avgOrderValue}`} />
      </div>
    </div>
  );
};

export default Overview;

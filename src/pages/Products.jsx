import { useState, useMemo } from "react";
import useProducts from "../hooks/useProducts.jsx";
import "../styling/products.css";

const ITEMS_PER_PAGE = 10;

const Products = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sortKey) {
      result = [...result].sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (typeof valA === "string") {
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return sortDirection === "asc" ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [products, search, category, sortKey, sortDirection]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  if (page > totalPages && totalPages > 0) {
    setPage(1);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const sortAria = (key) =>
    sortKey === key
      ? sortDirection === "asc"
        ? "ascending"
        : "descending"
      : "none";

  const sortIndicator = (key) =>
    sortKey === key ? (sortDirection === "asc" ? "▲" : "▼") : "";

  return (
    <div>
      <h1>Products</h1>

      <div className="filters-row">
        <div>
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div>
          <label htmlFor="category-select" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th
              scope="col"
              onClick={() => handleSort("title")}
              style={{ cursor: "pointer" }}
              aria-sort={sortAria("title")}
            >
              Title {sortIndicator("title")}
            </th>
            <th
              scope="col"
              onClick={() => handleSort("category")}
              style={{ cursor: "pointer" }}
              aria-sort={sortAria("category")}
            >
              Category {sortIndicator("category")}
            </th>
            <th
              scope="col"
              onClick={() => handleSort("price")}
              style={{ cursor: "pointer" }}
              aria-sort={sortAria("price")}
            >
              Price {sortIndicator("price")}
            </th>
            <th
              scope="col"
              onClick={() => handleSort("stock")}
              style={{ cursor: "pointer" }}
              aria-sort={sortAria("stock")}
            >
              Stock {sortIndicator("stock")}
            </th>
            <th
              scope="col"
              onClick={() => handleSort("rating")}
              style={{ cursor: "pointer" }}
              aria-sort={sortAria("rating")}
            >
              Rating {sortIndicator("rating")}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.thumbnail} alt={product.title} width="50" />
              </td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span aria-live="polite">
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;

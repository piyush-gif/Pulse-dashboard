export async function getProducts(limit = 100) {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
  const data = await res.json();
  return data.products;
}

export async function getCarts() {
  const res = await fetch(`https://dummyjson.com/carts`);
  const data = await res.json();
  return data.carts;
}

export async function getCartById(id) {
  const res = await fetch(`https://dummyjson.com/cart/${id}`);
  return res.json();
}

export async function getUsers(limit = 100) {
  const res = await fetch(`https://dummyjson.com/users?limit=${limit}`);
  const data = await res.json();
  return data.users;
}

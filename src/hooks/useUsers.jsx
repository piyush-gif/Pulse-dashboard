import { useState, useEffect } from "react";
import { getUsers } from "../api/dummyjson";
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return { users, loading, error };
};

export default useUsers;

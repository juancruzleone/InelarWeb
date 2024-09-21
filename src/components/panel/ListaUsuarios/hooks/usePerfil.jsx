import { useState, useEffect } from "react";
import { fetchUserProfile } from "@/components/perfilUsuarios/services/FetchPerfil";

const usePerfil = (id) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const userData = await fetchUserProfile(id);
        setUser(userData);
        // Fetch orders if needed
        // const ordersData = await fetchUserOrders(id);
        // setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { user, orders, loading, error };
};

export default usePerfil;
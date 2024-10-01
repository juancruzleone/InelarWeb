// usePerfil.jsx
import { useState, useEffect } from "react";
import { fetchUserProfile } from "@/components/perfilUsuarios/services/FetchPerfil";
import { fetchUserOrders } from "@/components/perfilUsuarios/services/FetchOrden";

const usePerfil = (id) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await fetchUserProfile(id);
        setUser(userProfile);

        if (userProfile) {
          const userOrders = await fetchUserOrders(id);
          setOrders(userOrders);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { user, orders, loading, error };
};

export default usePerfil;
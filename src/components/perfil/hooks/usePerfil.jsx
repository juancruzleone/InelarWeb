import { useState, useEffect } from "react";
import { fetchUserProfile } from "@/components/perfil/services/FetchPerfil.jsx";
import { fetchUserOrders } from "@/components/perfil/services/FetchOrden.jsx";

const usePerfil = (id, router) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await fetchUserProfile(id, router);
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

  return { user, orders, loading, error, setUser, setOrders };
};

export default usePerfil;

import { useState, useEffect } from "react";
import { fetchOrders, updateOrderStatus } from "@/components/panel/ListaOrdenes/services/FetchOrdenes";
import { filterOrders } from "@/components/panel/ListaOrdenes/utils/OrdenesUtils.jsx";

export default function useOrdenes() {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setAllOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAllOrders([]);
        setFilteredOrders([]);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(filterOrders(allOrders, searchTerm));
  }, [allOrders, searchTerm]);

  const handleUpdateOrderStatus = async (orderId, nuevoEstado) => {
    try {
      await updateOrderStatus(orderId, nuevoEstado);
      
      const updatedOrders = allOrders.map(order => 
        order._id === orderId 
          ? { ...order, estado: nuevoEstado }
          : order
      );
      
      setAllOrders(updatedOrders);
      
      return true;
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      return false;
    }
  };

  return { 
    filteredOrders, 
    allOrders,
    loading, 
    searchTerm, 
    setSearchTerm,
    handleUpdateOrderStatus
  };
}
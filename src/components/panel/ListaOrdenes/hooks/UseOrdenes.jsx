import { useState, useEffect } from "react";
import { fetchOrders, updateOrderStatus } from "@/components/panel/ListaOrdenes/services/FetchOrdenes";
import { filterOrders } from "@/components/panel/ListaOrdenes/utils/OrdenesUtils.jsx";

export default function useOrdenes() {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
    const filtered = filterOrders(allOrders, searchTerm, filterStatus);
    setFilteredOrders(filtered);
  }, [allOrders, searchTerm, filterStatus]);

  const handleUpdateOrderStatus = async (orderId, nuevoEstado) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, nuevoEstado);
      
      const updatedOrders = allOrders.map(order => 
        order._id === orderId 
          ? { ...order, estado: updatedOrder.estado }
          : order
      );
      
      setAllOrders(updatedOrders);
      const filtered = filterOrders(updatedOrders, searchTerm, filterStatus);
      setFilteredOrders(filtered);
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
  };

  return { 
    filteredOrders, 
    allOrders,
    loading, 
    searchTerm, 
    setSearchTerm,
    handleUpdateOrderStatus,
    filterStatus,
    setFilterStatus
  };
}
import { useState, useEffect } from "react";
import styles from "@/styles/ListaOrdenes.module.css";
import OrdenItem from "@/components/panel/ListaOrdenes/components/OrdenItem.jsx";
import useOrdenes from "@/components/panel/ListaOrdenes/hooks/UseOrdenes";

export default function Component() {
  const { 
    filteredOrders, 
    allOrders,
    loading, 
    searchTerm, 
    setSearchTerm, 
    handleUpdateOrderStatus,
    filterStatus,
    setFilterStatus
  } = useOrdenes();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <>
      <h2 className={styles.tituloPaginasPanel}>Pedidos</h2>

        <input
          type="text"
          placeholder="Buscar pedido por ID o nombre de producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.buscadorPanel} 
          aria-label="Buscar pedidos"
        />
        <div className={styles.filtroEstado}>
        <label htmlFor="statusFilter" className={styles.filtroLabel}>Filtrar por estado:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filtroSelect}
            aria-label="Filtrar por estado"
          >
            <option value="all">Todos</option>
            <option value="enviado">Enviados</option>
            <option value="no enviado">No enviados</option>
          </select>
        </div>
      <div className={styles.posicionSeccionProductos}>
        <div className={styles.contenedorServicios}>
          {loading ? (
            <p className={styles.cargandoMensajes}>Cargando pedidos...</p>
          ) : filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <OrdenItem 
                key={order._id} 
                order={order} 
                onUpdateStatus={handleUpdateOrderStatus}
              />
            ))
          ) : (
            <p className={styles.textoBuscadorPanel}>Ningún pedido encontrado</p>
          )}
        </div>
      </div>
    </>
  );
}
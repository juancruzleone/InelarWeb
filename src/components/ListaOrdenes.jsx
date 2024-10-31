import { useState, useEffect } from "react";
import styles from "@/styles/ListaOrdenes.module.css";
import OrdenItem from "@/components/panel/ListaOrdenes/components/OrdenItem.jsx";
import useOrdenes from "@/components/panel/ListaOrdenes/hooks/UseOrdenes";

const ListaOrdenes = () => {
  const { 
    filteredOrders, 
    allOrders,
    loading, 
    searchTerm, 
    setSearchTerm, 
    handleUpdateOrderStatus 
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
      <h2 className={styles.tituloPaginasPanel}>Órdenes</h2>
      <input
        type="text"
        placeholder="Buscar orden por ID o nombre de producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.buscadorPanel} 
        aria-label="Buscar órdenes"
      />
      <div className={styles.posicionSeccionProductos}>
        <div className={styles.contenedorServicios}>
          {loading ? (
            <p className={styles.cargandoMensajes}>Cargando órdenes...</p>
          ) : filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <OrdenItem 
                key={index} 
                order={order} 
                onUpdateStatus={handleUpdateOrderStatus}
              />
            ))
          ) : (
            <p className={styles.textoBuscadorPanel}>Ninguna orden encontrada</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ListaOrdenes;
// components/ListaMensajes.js
import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

const ListaMensajes = () => {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Realiza la solicitud al backend cuando el componente se monta
    const obtenerMensajes = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:2023/api/contactos");
        const data = await response.json();

        setMensajes(data);
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerMensajes();
  }, []); // Se ejecuta solo cuando el componente se monta

  return (
    <div className={styles.app}>
      <div className={styles.contenedorPagina}>
        <h1 className={styles.tituloPaginasPanel}>Mensajes</h1>
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorProductosPanel}>
            {loading ? (
              <p>Cargando mensajes...</p>
            ) : (
              mensajes.map((mensaje, index) => (
                <div key={index} className={styles.tarjetaProductoPanel}>
                  <h3>{mensaje.name}</h3>
                  <div className={styles.contenidoTarjetaProductoPanelContacto}>
                    <p><span>Email:</span> {mensaje.email}</p>
                    <p><span>Mensaje:</span> {mensaje.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaMensajes;

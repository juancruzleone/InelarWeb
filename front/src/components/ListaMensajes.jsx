// components/ListaMensajes.js
import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

const ListaMensajes = () => {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    // Realiza la solicitud al backend cuando el componente se monta
    const obtenerMensajes = async () => {
      try {
        const response = await fetch("http://localhost:2023/api/contactos");
        const data = await response.json();

        setMensajes(data);
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
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
            {mensajes.map((mensaje, index) => (
              <div key={index} className={styles.tarjetaProductoPanel}>
                <h3>{mensaje.name}</h3>
                <p>Email: {mensaje.email}</p>
                <p>Mensaje: {mensaje.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaMensajes;

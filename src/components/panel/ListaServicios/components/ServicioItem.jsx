import React from "react";
import styles from "@/styles/Home.module.css";

export default function ServicioItem({ service }) {
  return (
    <div className={styles.tarjetaProductoPanel}>
      <h3>Cliente: {service.nombre}</h3>
      <div className={styles.contenidoTarjetaProductoPanel}>
        <p><span>Email:</span> {service.email}</p>
        <p><span>Teléfono:</span> {service.telefono}</p>
        <p><span>Dirección:</span> {service.direccion}</p>
        <p><span>Dispositivo:</span> {service.dispositivo}</p>
        <p><span>Cantidad:</span> {service.cantidad}</p>
        <p><span>Fecha:</span> {service.fecha}</p>
        <p><span>Categoría:</span> {service.category}</p>
      </div>
    </div>
  );
}
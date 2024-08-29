import React from "react";
import styles from "@/styles/Home.module.css";

export default function MensajeItem({ message }) {
  return (
    <div className={styles.tarjetaProductoPanel}>
      <h3>{message.name}</h3>
      <div className={styles.contenidoTarjetaProductoPanelContacto}>
        <p><span>Email:</span> {message.email}</p>
        <p><span>Mensaje:</span> {message.message}</p>
      </div>
    </div>
  );
}
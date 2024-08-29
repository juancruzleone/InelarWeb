import React from "react";
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

const ModalEliminar = ({ isOpen, onRequestClose, onConfirm }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Eliminar Cliente"
    className={`${styles.ModalPanelEditar} ${styles.Modal}`}
    closeTimeoutMS={1000}
  >
    <h2>Eliminar Cliente</h2>
    <p>¿Estás seguro de que deseas eliminar este cliente?</p>
    <div className={styles.contenedorBotonesEditar}>
      <button
        onClick={onConfirm} // Cambiado para llamar a eliminarClienteSeleccionado
        className={styles.botonEliminarProducto}
      >
        Eliminar
      </button>
      <button onClick={onRequestClose} className={styles.botonCancelarModal}>
        Cancelar
      </button>
    </div>
  </Modal>
);

export default ModalEliminar;
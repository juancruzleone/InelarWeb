import React from "react";
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

const ModalEliminar = ({ isOpen, onRequestClose, onConfirm }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Delete Client"
    className={`${styles.ModalPanelEditar} ${styles.Modal}`}
    closeTimeoutMS={1000}
  >
    <h2>Delete Client</h2>
    <p>Are you sure you want to delete this client?</p>
    <div className={styles.contenedorBotonesEditar}>
      <button
        onClick={onConfirm}
        className={styles.botonEliminarProducto}
      >
        Delete
      </button>
      <button onClick={onRequestClose} className={styles.botonCancelarModal}>
        Cancel
      </button>
    </div>
  </Modal>
);

export default ModalEliminar;
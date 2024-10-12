import React from 'react';
import Modal from "react-modal";
import styles from "@/styles/ListaInstalaciones.module.css";

const ModalEliminarInstalacion = ({ isOpen, onRequestClose, onConfirm, isDeleting }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Eliminar Instalación"
      className={`${styles.ModalPanelEditar} ${styles.Modal}`}
      closeTimeoutMS={1000}
    >
      <h2>Eliminar instalación</h2>
      <p className={styles.textoEliminarCliente}>¿Estás seguro de eliminar esta instalación?</p>
      <div className={styles.contenedorBotonesEditar}>
        <button
          onClick={onConfirm}
          className={styles.botonEliminarProducto}
          disabled={isDeleting}
        >
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </button>
        <button 
          onClick={onRequestClose} 
          className={styles.botonCancelarModal}
          disabled={isDeleting}
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalEliminarInstalacion;
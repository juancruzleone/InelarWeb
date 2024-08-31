import React from "react";
import Modal from "react-modal";
import FormularioCrearCliente from "@/components/panel/ListaClientes/components/FormularioCrearCliente.jsx";
import styles from "@/styles/Home.module.css";

Modal.setAppElement('#__next');

const ModalCrear = ({ isOpen, onRequestClose, token, role, actualizarClientes }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Create Client"
    className={`${styles.ModalPanelClientes} ${styles.Modal}`}
    closeTimeoutMS={1000}
  >
    <h2>Create Client</h2>
    <FormularioCrearCliente 
      onRequestClose={onRequestClose} 
      token={token} 
      role={role} 
      actualizarClientes={actualizarClientes}
    />
  </Modal>
);

export default ModalCrear;
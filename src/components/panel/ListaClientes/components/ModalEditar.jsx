import React from "react";
import Modal from "react-modal";
import FormularioEditarCliente from "@/components/panel/ListaClientes/components/FormularioEditarCliente.jsx";
import styles from "@/styles/Home.module.css";

Modal.setAppElement('#__next');

const ModalEditar = ({ editModal, handleCloseModal, selectedClient, setSelectedClient, token, role, refreshClients }) => (
  <Modal
    isOpen={editModal}
    onRequestClose={handleCloseModal}
    contentLabel="Editar Cliente"
    className={`${styles.ModalPanelClientes} ${styles.Modal}`}
    closeTimeoutMS={1000}
  >
    <h2>Editar Cliente</h2>
    <FormularioEditarCliente 
      selectedClient={selectedClient}
      setSelectedClient={setSelectedClient}
      handleCloseModal={handleCloseModal}
      token={token}
      role={role}
      refreshClients={refreshClients}
    />
  </Modal>
);

export default ModalEditar;

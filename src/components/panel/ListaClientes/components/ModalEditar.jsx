import React from "react";
import Modal from "react-modal";
import FormularioEditarCliente from "@/components/panel/ListaClientes/components/FormularioEditarCliente.jsx";
import styles from "@/styles/Home.module.css";

Modal.setAppElement('#__next');

const ModalEditar = ({ modalEditar, handleCerrarModal, clienteSeleccionado, setClienteSeleccionado, token, role, actualizarClientes }) => (
  <Modal
    isOpen={modalEditar}
    onRequestClose={handleCerrarModal}
    contentLabel="Edit Client"
    className={`${styles.ModalPanelClientes} ${styles.Modal}`}
    closeTimeoutMS={1000}
  >
    <h2>Editar cliente</h2>
    <FormularioEditarCliente 
      clienteSeleccionado={clienteSeleccionado}
      setClienteSeleccionado={setClienteSeleccionado}
      handleCerrarModal={handleCerrarModal}
      token={token}
      role={role}
      actualizarClientes={actualizarClientes}
    />
  </Modal>
);

export default ModalEditar;

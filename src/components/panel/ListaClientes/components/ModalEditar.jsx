import React from 'react';
import Modal from 'react-modal';
import FormularioEditarCliente from '@/components/panel/ListaClientes/components/FormularioEditarCliente.jsx';
import styles from '@/styles/Home.module.css';

const EditarClienteModal = ({ modalEditar, handleCerrarModal, clienteSeleccionado, setClienteSeleccionado, token, role, actualizarClientes }) => {
  return (
    <Modal
      isOpen={modalEditar}
      onRequestClose={handleCerrarModal}
      contentLabel="Editar Cliente"
      className={`${styles.ModalPanelClientes} ${styles.Modal}`}
      closeTimeoutMS={1000}
    >
      <h2>Editar Cliente</h2>
      <FormularioEditarCliente
        clienteSeleccionado={clienteSeleccionado}
        setClienteSeleccionado={setClienteSeleccionado}
        handleCerrarModal={handleCerrarModal}
        token={token}
        role={role}
        actualizarClientes={actualizarClientes}  // Pasar la función actualizarClientes al formulario
      />
    </Modal>
  );
};

export default EditarClienteModal;
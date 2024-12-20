import Modal from "react-modal";
import FormularioCrearCliente from "@/components/panel/ListaClientes/components/FormularioCrearCliente.jsx";
import styles from "@/styles/ListaClientes.module.css";

Modal.setAppElement('#__next');

const ModalCrear = ({ isOpen, onRequestClose, token, role, refreshClients, setConfirmationModal, setConfirmationMessage }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Crear Cliente"
    className={`${styles.ModalPanelClientes} ${styles.Modal}`}
    shouldCloseOnOverlayClick={false}
    closeTimeoutMS={500}
  >
    <h2>Crear Cliente</h2>
    <FormularioCrearCliente 
      onRequestClose={onRequestClose} 
      token={token} 
      role={role} 
      refreshClients={refreshClients}
      setConfirmationModal={setConfirmationModal}
      setConfirmationMessage={setConfirmationMessage}
    />
  </Modal>
);

export default ModalCrear;
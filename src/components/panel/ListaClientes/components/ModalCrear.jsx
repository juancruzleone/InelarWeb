import Modal from "react-modal";
import FormularioCrearCliente from "@/components/panel/ListaClientes/components/FormularioCrearCliente.jsx";
import styles from "@/styles/Home.module.css";

Modal.setAppElement('#__next');

const ModalCrear = ({ isOpen, onRequestClose, token, role, refreshClients, setConfirmationModal }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Crear Cliente"
    className={`${styles.ModalPanelClientes} ${styles.Modal}`}
    closeTimeoutMS={1000}
  >
    <h2>Crear Cliente</h2>
    <FormularioCrearCliente 
      onRequestClose={onRequestClose} 
      token={token} 
      role={role} 
      refreshClients={refreshClients}
      setConfirmationModal={setConfirmationModal} 
    />
  </Modal>
);

export default ModalCrear;

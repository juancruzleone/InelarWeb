import Modal from "react-modal";
import styles from "@/styles/ListaServicios.module.css";

const ModalConfirmar = ({
  isOpen,
  onClose,
  service,
  onConfirm,
  isLoading
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmar Acción"
      shouldCloseOnOverlayClick={false}
      className={styles.ModalConfirmarServicio} 
      closeTimeoutMS={500}
    >
      <div>
        <h2>Modal confirmar</h2>
        <p>¿Estás seguro de que deseas marcar este servicio como realizado?</p>
        <div className={styles.contenedorBotonesEditar}>
          <button 
            onClick={onConfirm} 
            className={styles.botonConfirmar}
            disabled={isLoading}
          >
            {isLoading ? 'Actualizando...' : 'Confirmar'}
          </button>
          <button 
            onClick={onClose} 
            className={styles.botonCancelarModal}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmar;

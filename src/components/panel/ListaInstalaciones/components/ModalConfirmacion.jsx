import Modal from "react-modal";
import Image from "next/image";
import styles from "@/styles/ListaInstalaciones.module.css";

const ModalConfirmacion = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmación"
      className={`${styles.Modal}`}
      closeTimeoutMS={500}
    >
      <div className={styles.modalContent}>
        <p className={styles.confirmationMessage}>{message}</p>
        <Image
          src="/tick.svg"
          alt="Operación realizada correctamente"
          width={40}
          height={40}
          className={styles.tickModal}
        />
        <button onClick={onClose} className={styles.cerrarModalButton}>
          ❌
        </button>
      </div>
    </Modal>
  );
};

export default ModalConfirmacion;

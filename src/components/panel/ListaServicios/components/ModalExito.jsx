import Modal from "react-modal";
import Image from "next/image";
import styles from "@/styles/ListaServicios.module.css";

const ModalExito = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmación"
      className={`${styles.ModalExito}`}
      closeTimeoutMS={500}
    >
      <div className={styles.modalContent}>
        <Image
          src="/tick.svg"
          alt="Operación realizada correctamente"
          width={40}
          height={40}
          className={styles.tickModal}
        />
        <p className={styles.confirmationMessage}>{message}</p>
        <button onClick={onClose} className={styles.cerrarModalButton}>
          ❌
        </button>
      </div>
    </Modal>
  );
};

export default ModalExito;

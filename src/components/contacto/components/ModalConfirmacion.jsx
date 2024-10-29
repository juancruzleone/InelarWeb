import Modal from "react-modal";
import Image from "next/image";
import styles from "@/styles/Contacto.module.css";

const ModalConfirmacion = ({ isOpen, onRequestClose, mensaje }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation"
      className={`${styles.Modal}`}
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={500}
    >
      <p>{mensaje}</p>
      <Image src="/tick.svg" alt="Operación realizada correctamente" width={40} height={40} className={styles.tickModal} />
      <button onClick={onRequestClose} className={styles.cerrarModalButton}>
        ❌
      </button>
    </Modal>
  );
};

export default ModalConfirmacion;
import React from "react";
import Modal from "react-modal";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

const ModalConfirmacion = ({ isOpen, onClose, message }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Confirmación"
    className={`${styles.Modal}`}
    closeTimeoutMS={500}
  >
    <p>{message}</p>
    <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal} />
    <button onClick={onClose} className={styles.cerrarModalButton}>
      ❌
    </button>
  </Modal>
);

export default ModalConfirmacion;
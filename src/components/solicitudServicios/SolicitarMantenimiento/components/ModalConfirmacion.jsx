import React from "react";
import Modal from "react-modal";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

const ModalConfirmacion = ({ isOpen, onRequestClose, mensaje }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Confirmation"
    className={styles.Modal}
    closeTimeoutMS={500}
  >
    <p>{mensaje}</p>
    <Image src="/tick.svg" alt="Success icon" width={40} height={40} className={styles.tickModal} />
    <button onClick={onRequestClose} className={styles.cerrarModalButton}>
      ❌
    </button>
  </Modal>
);

export default ModalConfirmacion;
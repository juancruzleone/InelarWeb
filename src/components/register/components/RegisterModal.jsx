import React from "react";
import Modal from "react-modal";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

Modal.setAppElement("#__next");

const RegisterModal = ({ isOpen, closeModal }) => (
  <Modal
    isOpen={isOpen}
    className={styles.Modal}
    onRequestClose={closeModal}
    contentLabel="Cuenta registrada"
  >
    <h2 className={styles.tituloModal}>Cuenta registrada exitosamente</h2>
    <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal} />
    <button onClick={closeModal} className={styles.botonCerrarModal}>❌</button>
  </Modal>
);

export default RegisterModal;

import React from "react";
import Modal from "react-modal";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

Modal.setAppElement("#__next");

const ModalLogin = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      className={styles.Modal}
      onRequestClose={closeModal}
      contentLabel="Inicio de sesión exitoso"
    >
      <h2 className={styles.tituloModal}>Inicio de sesión exitoso</h2>
      <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal} />
      <button onClick={closeModal} className={styles.botonCerrarModal}>❌</button>
    </Modal>
  );
};

export default ModalLogin;

import React from "react";
import Image from "next/image";
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

const ContactModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Mensaje Enviado"
      className={styles.Modal}
      overlayClassName={styles.modalOverlay}
    >
      <h2>Mensaje enviado correctamente</h2>
      <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal} />
      <button onClick={closeModal} className={styles.botonCerrarModal}>
        ❌
      </button>
    </Modal>
  );
};

export default ContactModal;

import React from "react";
import Image from "next/image"
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

const SolicitarInstalacionModal = ({ modalIsOpen, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.Modal}
      contentLabel="Solicitud Enviada"
    >
      <h2>Solicitud enviada con éxito</h2>
      <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal} />
      <button onClick={closeModal} className={styles.botonCerrarModal}>
        ❌
      </button>
    </Modal>
  );
};

export default SolicitarInstalacionModal;

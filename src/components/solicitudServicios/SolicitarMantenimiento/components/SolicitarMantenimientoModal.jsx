import React from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

const SolicitarMantenimientoModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.Modal}
      contentLabel="Solicitud Enviada"
    >
      <h2>Solicitud enviada con éxito</h2>
      <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal} />
      <button onClick={onRequestClose} className={styles.botonCerrarModal}>
        ❌
      </button>
    </Modal>
  );
};

export default SolicitarMantenimientoModal;
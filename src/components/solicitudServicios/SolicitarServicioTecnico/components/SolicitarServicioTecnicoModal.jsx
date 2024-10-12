import Modal from 'react-modal';
import styles from '@/styles/SolicitudServicio.module.css';

const ModalExito = ({ isOpen, onRequestClose, mensaje, submensaje }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.Modal}
      contentLabel="Solicitud Enviada"
    >
      <div className={styles.contenidoModal}>
        <h2>{mensaje}</h2>
        <p>{submensaje}</p>
      </div>
    </Modal>
  );
};

export default ModalExito;
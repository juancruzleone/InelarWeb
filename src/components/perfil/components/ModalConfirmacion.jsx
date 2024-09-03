import Modal from 'react-modal';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

const ModalConfirmacion = ({ showConfirmationModal, setShowConfirmationModal }) => (
  <Modal
    isOpen={showConfirmationModal}
    onRequestClose={() => setShowConfirmationModal(false)}
    contentLabel="Confirmación de Edición"
    className={styles.Modal}
  >
    <h2>Nombre editado exitosamente</h2>
    <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal}/>
    <button className={styles.botonCerrarModal} onClick={() => setShowConfirmationModal(false)}>❌</button>
  </Modal>
);

export default ModalConfirmacion;

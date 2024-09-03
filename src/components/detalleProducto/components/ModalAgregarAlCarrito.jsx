import Modal from 'react-modal';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

const ModalAgregarAlCarrito = ({ modalIsOpen, setModalIsOpen }) => (
  <Modal
    isOpen={modalIsOpen}
    className={styles.Modal}
    onRequestClose={() => setModalIsOpen(false)}
    contentLabel="Producto agregado al carrito"
  >
    <h2>Producto agregado al carrito</h2>
    <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal} />
    <button onClick={() => setModalIsOpen(false)} className={styles.botonCerrarModal}>
      ❌
    </button>
  </Modal>
);

export default ModalAgregarAlCarrito;

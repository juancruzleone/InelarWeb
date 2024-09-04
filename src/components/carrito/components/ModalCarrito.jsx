import Modal from 'react-modal';
import Image from "next/image";
import styles from '@/styles/Home.module.css';

const CarritoModal = ({ modalState, setModalState, action, handleConfirmAction, confirmRemoveProduct }) => {
  const closeModal = (modal) => {
    setModalState({ ...modalState, [modal]: false });
  };

  return (
    <>
      <Modal
        isOpen={modalState.isOpen}
        className={styles.ModalCheckout}
        onRequestClose={() => closeModal('isOpen')}
        contentLabel="Debes iniciar sesión para proceder al checkout"
      >
        <h2 className={styles.tituloModalCheckout}>Tenés que iniciar sesión para ir al checkout</h2>
      </Modal>
      <Modal
        isOpen={modalState.confirmOpen}
        className={styles.Modal}
        onRequestClose={() => closeModal('confirmOpen')}
        contentLabel="Confirmar acción"
      >
        <h2 className={styles.tituloModalConfirm}>¿Estás seguro de que quieres vaciar el carrito?</h2>
        <div className={styles.contenedorBotonesModalVaciar}>
          <button className={styles.botonConfirmarModal} onClick={handleConfirmAction}>Confirmar</button>
          <button className={styles.botonCancelarModal} onClick={() => closeModal('confirmOpen')}>Cancelar</button>
        </div>
      </Modal>
      <Modal
        isOpen={modalState.deleteOpen}
        className={styles.Modal}
        onRequestClose={() => closeModal('deleteOpen')}
        contentLabel="Eliminar producto"
      >
        <h2 className={styles.tituloModalConfirm}>¿Estás seguro de que quieres eliminar este producto del carrito?</h2>
        <div className={styles.contenedorBotonesModalVaciar}>
          <button className={styles.botonConfirmarModal} onClick={confirmRemoveProduct}>Confirmar</button>
          <button className={styles.botonCancelarModal} onClick={() => closeModal('deleteOpen')}>Cancelar</button>
        </div>
      </Modal>
      <Modal
        isOpen={modalState.successOpen}
        className={styles.Modal}
        onRequestClose={() => closeModal('successOpen')}
        contentLabel="Orden exitosa"
      >
        <h2 className={styles.tituloModalSuccess}>¡Tu orden ha sido exitosa!</h2>
        <Image src="/tick.svg" alt="Success icon" width={40} height={40} className={styles.tickModal} />
        <button className={styles.botonCerrarModal} onClick={() => closeModal('successOpen')}>❌</button>
      </Modal>
    </>
  );
};

export default CarritoModal;
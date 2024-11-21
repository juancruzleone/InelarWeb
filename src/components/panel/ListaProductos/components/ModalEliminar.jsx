import Modal from "react-modal";
import styles from "@/styles/ListaProductos.module.css";

const ModalEliminar = ({
  isOpen,
  onClose,
  selectedProduct,
  handleDeleteSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Eliminar Producto"
      className={`${styles.ModalEliminarProducto} ${styles.ModalEliminarProducto}`}
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={500}
    >
      <h2>Eliminar Producto</h2>
      <p>¿Estás seguro de que deseas eliminar este producto? <strong>{selectedProduct?.name}</strong></p>
      <div className={styles.contenedorBotonesEditar}>
        <button onClick={handleDeleteSubmit} className={styles.botonEliminarProducto}>
          Eliminar
        </button>
        <button onClick={onClose} className={styles.botonCancelarModal}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalEliminar;
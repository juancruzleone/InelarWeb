import Modal from "react-modal";
import styles from "@/styles/ListaClientes.module.css";

const ModalEliminar = ({ isOpen, onRequestClose, onConfirm }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Delete Client"
    className={`${styles.ModalPanelEditar} ${styles.Modal}`}
    closeTimeoutMS={1000}
  >
    <h2>Eliminar cliente</h2>
    <p className={styles.textoEliminarCliente}>¿Estás seguro de eliminar este cliente?</p>
    <div className={styles.contenedorBotonesEditar}>
      <button
        onClick={onConfirm}
        className={styles.botonEliminarProducto}
      >
        Eliminar
      </button>
      <button onClick={onRequestClose} className={styles.botonCancelarModal}>
        Cancelar
      </button>
    </div>
  </Modal>
);

export default ModalEliminar;
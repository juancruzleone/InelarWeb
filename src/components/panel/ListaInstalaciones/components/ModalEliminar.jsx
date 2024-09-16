import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

const ModalEliminarInstalacion = ({ isOpen, onRequestClose, onConfirm }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Eliminar Instalación"
    className={`${styles.ModalPanelEditar} ${styles.Modal}`}
    closeTimeoutMS={1000}
  >
    <h2>Eliminar instalación</h2>
    <p className={styles.textoEliminarCliente}>¿Estás seguro de eliminar esta instalación?</p>
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

export default ModalEliminarInstalacion;
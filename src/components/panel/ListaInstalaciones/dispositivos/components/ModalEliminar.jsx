import React from "react";
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";
import useDispositivos from "@/components/panel/ListaInstalaciones/dispositivos/hooks/useDispositivos.jsx";
import ConfirmacionModal from "@/components/panel/ListaInstalaciones/components/ModalConfirmacion";

const ModalEliminarDispositivo = ({ isOpen, onClose, installation, selectedDevice, onDeviceDeleted }) => {
  const {
    confirmationModal,
    confirmationMessage,
    setConfirmationModal,
    handleDeleteSubmit,
  } = useDispositivos(installation?._id, selectedDevice?._id, onDeviceDeleted);

  const onConfirm = async () => {
    const success = await handleDeleteSubmit();
    if (success) {
      onDeviceDeleted(selectedDevice._id);
      onClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Eliminar Dispositivo"
        className={`${styles.ModalPanelEditar} ${styles.Modal}`}
        closeTimeoutMS={1000}
      >
        <h2>Eliminar dispositivo</h2>
        <p className={styles.textoEliminarCliente}>¿Estás seguro de eliminar este dispositivo?</p>
        <div className={styles.contenedorBotonesEditar}>
          <button
            onClick={onConfirm}
            className={styles.botonEliminarProducto}
          >
            Eliminar
          </button>
          <button onClick={onClose} className={styles.botonCancelarModal}>
            Cancelar
          </button>
        </div>
      </Modal>
      <ConfirmacionModal
        isOpen={confirmationModal}
        message={confirmationMessage}
        onClose={() => setConfirmationModal(false)}
      />
    </>
  );
};

export default ModalEliminarDispositivo;
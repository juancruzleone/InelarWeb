import React from "react";
import Modal from "react-modal";
import styles from "@/styles/ListaDispositivos.module.css";
import FormularioCrear from "@/components/panel/ListaInstalaciones/dispositivos/components/FormularioCrear";
import useDispositivos from "@/components/panel/ListaInstalaciones/dispositivos/hooks/useDispositivos";
import ConfirmacionModal from "@/components/panel/ListaInstalaciones/components/ModalConfirmacion";

const ModalCrear = ({ isOpen, onClose, installationId, onDeviceCreated }) => {
  const {
    newDevice,
    createErrors,
    confirmationModal,
    confirmationMessage,
    isLoading,
    setConfirmationModal,
    handleInputChange,
    handleCreateSubmit,
  } = useDispositivos(installationId);

  const handleSubmit = async (e) => {
    const success = await handleCreateSubmit(e);
    if (success) {
      onClose();
      if (onDeviceCreated) {
        onDeviceCreated();
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Crear Dispositivo"
        className={`${styles.ModalPanelDispositivo}`}
        closeTimeoutMS={500}
        shouldCloseOnOverlayClick={false}
      >
        <h2>Crear dispositivo</h2>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p className={styles.textoLoaderModal}>Creando dispositivo...</p>
          </div>
        ) : (
          <FormularioCrear
            newDevice={newDevice}
            errors={createErrors}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            onClose={onClose}
          />
        )}
      </Modal>
      <ConfirmacionModal
        isOpen={confirmationModal}
        message={confirmationMessage}
        onClose={() => setConfirmationModal(false)}
      />
    </>
  );
};

export default ModalCrear;
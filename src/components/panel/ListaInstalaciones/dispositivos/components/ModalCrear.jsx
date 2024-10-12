import React, { useEffect } from "react";
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
    setConfirmationModal,
    handleInputChange,
    handleCreateSubmit,
  } = useDispositivos(installationId);

  useEffect(() => {
    // Asegúrate de que el token esté en localStorage
    const userData = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjU3ZDlhMGYwYWJmMDAyYzNhNDI1YjQiLCJ1c2VyTmFtZSI6ImFkbWluMTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjU3MzI1fQ.96S31DfZaCbhremnkBteT8sEd191hKjmMmhD7rEXx30",
      cuenta: {
        _id: "6657d9a0f0abf002c3a425b4",
        userName: "admin123",
        role: "admin"
      }
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  }, []);

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
        className={`${styles.ModalPanelDispositivo} ${styles.Modal}`}
        closeTimeoutMS={500}
      >
        <h2>Crear dispositivo</h2>
        <FormularioCrear
          newDevice={newDevice}
          errors={createErrors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          onClose={onClose}
        />
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
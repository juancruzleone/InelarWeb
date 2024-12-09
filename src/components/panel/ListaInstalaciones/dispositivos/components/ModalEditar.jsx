import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "@/styles/ListaDispositivos.module.css";
import FormularioEditar from "@/components/panel/ListaInstalaciones/dispositivos/components/FormularioEditar";
import useDispositivos from "@/components/panel/ListaInstalaciones/dispositivos/hooks/useDispositivos";
import ConfirmacionModal from "@/components/panel/ListaInstalaciones/components/ModalConfirmacion";
import { validateDevice } from '@/components/panel/ListaInstalaciones/dispositivos/utils/Validaciones';

const ModalEditar = ({
  isOpen,
  onClose,
  selectedDevice,
  installation,
  onDeviceUpdated, 
}) => {
  const [localDevice, setLocalDevice] = useState(selectedDevice || {});
  const [localErrors, setLocalErrors] = useState({});

  const {
    editDevice,
    confirmationModal,
    confirmationMessage,
    setConfirmationModal,
    handleEditSubmit,
  } = useDispositivos(installation?._id, selectedDevice?._id);

  useEffect(() => {
    setLocalDevice(selectedDevice || {});
    setLocalErrors({});
  }, [selectedDevice, isOpen]);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setLocalDevice(prev => ({ ...prev, [name]: value }));
    const { newErrors } = validateDevice({ ...localDevice, [name]: value });
    setLocalErrors(prev => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newErrors } = validateDevice(localDevice);
    if (Object.keys(newErrors).length === 0) {
      const success = await handleEditSubmit(e, localDevice);
      if (success) {
        onDeviceUpdated(localDevice);
        onClose();
      }
    } else {
      setLocalErrors(newErrors);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Editar Dispositivo"
        className={`${styles.ModalPanelDispositivo}`}
        closeTimeoutMS={500}
        shouldCloseOnOverlayClick={false}
      >
        <h2>Editar dispositivo</h2>
        <FormularioEditar
          selectedDevice={localDevice}
          errors={localErrors}
          handleEditInputChange={handleEditInputChange}
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

export default ModalEditar;
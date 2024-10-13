import React from "react";
import Modal from "react-modal";
import styles from "@/styles/ListaInstalaciones.module.css";
import FormularioEditar from "@/components/panel/ListaInstalaciones/components/FormularioEditar.jsx";

const ModalEditar = ({ 
  isOpen, 
  handleClose, 
  selectedInstallation, 
  errors, 
  handleSubmit, 
  handleEditInputChange,
  handleFileChange,
  setErrors,
  categories
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    contentLabel="Editar Instalación"
    className={`${styles.ModalPanelCrear} ${styles.Modal}`}
    shouldCloseOnOverlayClick={false}
    closeTimeoutMS={500}
  >
    <FormularioEditar 
      selectedInstallation={selectedInstallation} 
      errors={errors} 
      handleSubmit={handleSubmit}
      onClose={handleClose}
      handleEditInputChange={handleEditInputChange}
      setErrors={setErrors}
      categories={categories}
    />
  </Modal>
);

export default ModalEditar;
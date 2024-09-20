import React from "react";
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";
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
  categories,
  showConfirmation
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    contentLabel="Editar Instalación"
    className={`${styles.ModalPanelCrear} ${styles.Modal}`}
    closeTimeoutMS={500}
  >
    <FormularioEditar 
      selectedInstallation={selectedInstallation} 
      errors={errors} 
      handleSubmit={handleSubmit}
      onClose={handleClose}
      handleEditInputChange={handleEditInputChange}
      handleFileChange={handleFileChange}
      setErrors={setErrors}
      categories={categories}
      showConfirmation={showConfirmation}
    />
  </Modal>
);

export default ModalEditar;
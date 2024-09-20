import React from "react";
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";
import FormularioCrear from "@/components/panel/ListaInstalaciones/components/FormularioCrear.jsx";

const ModalCrear = ({ 
  isOpen, 
  onClose, 
  newInstallation, 
  errors, 
  showConfirmation, 
  handleInputChange, 
  handleFileChange, 
  handleTextareaInput, 
  handleSubmit, 
  setNewInstallation,
  setErrors,
  categories
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Crear Instalación"
    className={`${styles.ModalPanelCrear} ${styles.Modal}`}
    closeTimeoutMS={500}
  >
    <h2>Crear instalación</h2>
    <FormularioCrear 
      newInstallation={newInstallation} 
      errors={errors} 
      showConfirmation={showConfirmation} 
      handleInputChange={handleInputChange} 
      handleFileChange={handleFileChange} 
      handleTextareaInput={handleTextareaInput} 
      handleSubmit={handleSubmit}
      onClose={onClose}
      setNewInstallation={setNewInstallation}
      setErrors={setErrors}
      categories={categories}
    />
  </Modal>
);

export default ModalCrear;
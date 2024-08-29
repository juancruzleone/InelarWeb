import React from "react";
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";
import FormularioEditar from "@/components/panel/ListaProductos/components/FormularioEditar.jsx";

const ModalEditar = ({
  isOpen,
  onClose,
  selectedProduct,
  errors,
  showConfirmation,
  handleInputChange,
  handleFileChange,
  handleTextareaInput,
  handleSubmit,
  categories,
  previewImage,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Producto"
      className={`${styles.ModalPanelCrear} ${styles.Modal}`}
      closeTimeoutMS={500}
    >
      <h2>Editar Producto</h2>
      {selectedProduct && (
        <FormularioEditar
          selectedProduct={selectedProduct}
          errors={errors}
          showConfirmation={showConfirmation}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleTextareaInput={handleTextareaInput}
          handleSubmit={handleSubmit}
          categories={categories}
          handleCloseModal={onClose}
          previewImage={previewImage}
        />
      )}
    </Modal>
  );
};

export default ModalEditar;
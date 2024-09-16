import Modal from "react-modal";
import styles from "@/styles/Home.module.css";
import FormularioEditar from "@/components/panel/ListaInstalaciones/components/FormularioEditar";

const ModalEditar = ({
  isOpen,
  onClose,
  selectedInstallation,
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
      contentLabel="Editar Instalación"
      className={`${styles.ModalPanelCrear} ${styles.Modal}`}
      closeTimeoutMS={500}
    >
      <h2>Editar instalación</h2>
      {selectedInstallation && (
        <FormularioEditar
          initialValues={selectedInstallation}
          errors={errors}
          showConfirmation={showConfirmation}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleTextareaInput={handleTextareaInput}
          handleSubmit={handleSubmit}
          categories={categories}
          onClose={onClose}
          previewImage={previewImage}
        />
      )}
    </Modal>
  );
};

export default ModalEditar;
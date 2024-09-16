import Modal from "react-modal";
import styles from "@/styles/Home.module.css";
import FormularioEditar from "@/components/panel/ListaInstalaciones/components/FormularioEditar.jsx";

const ModalEditar = ({
  isOpen,
  onClose,
  selectedInstallation,
  errors,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Instalación"
      className={`${styles.ModalPanelCrear} ${styles.Modal}`}
      closeTimeoutMS={500}
    >
      <FormularioEditar
        selectedInstallation={selectedInstallation}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    </Modal>
  );
};

export default ModalEditar;
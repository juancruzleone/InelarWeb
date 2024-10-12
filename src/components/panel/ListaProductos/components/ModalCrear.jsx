import Modal from "react-modal";
import styles from "@/styles/ListaProductos.module.css";
import FormularioCrear from "@/components/panel/ListaProductos/components/FormularioCrear.jsx";

const ModalCrear = ({ isOpen, onClose, newProduct, errors, showConfirmation, handleInputChange, handleFileChange, handleTextareaInput, handleSubmit, categories }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Crear Producto"
    className={`${styles.ModalPanelCrear} ${styles.Modal}`}
    closeTimeoutMS={500}
  >
    <h2>Crear Producto</h2>
    <FormularioCrear 
      newProduct={newProduct} 
      errors={errors} 
      showConfirmation={showConfirmation} 
      handleInputChange={handleInputChange} 
      handleFileChange={handleFileChange} 
      handleTextareaInput={handleTextareaInput} 
      handleSubmit={handleSubmit}
      onClose={onClose}
      categories={categories} 
    />
  </Modal>
);

export default ModalCrear;

import React from "react";
import styles from "@/styles/Home.module.css";
import { handleInputChange, handleTextareaInput } from "@/components/panel/ListaInstalaciones/utils/validaciones.jsx";

const FormularioEditar = ({ 
  selectedInstallation, 
  errors, 
  handleSubmit, 
  onClose,
  handleEditInputChange,
  handleFileChange,
  setErrors,
  categories,
  showConfirmation
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const { updatedInstallation, newErrors } = handleInputChange(e, selectedInstallation);
    handleEditInputChange(name, value);
    setErrors(newErrors);
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    const { updatedInstallation, newErrors } = handleTextareaInput(e, selectedInstallation);
    handleEditInputChange(name, value);
    setErrors(newErrors);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      if (typeof showConfirmation === 'function') {
        showConfirmation("Instalación editada exitosamente");
      } else {
        console.log("Instalación editada exitosamente");
      }
      onClose();
    } catch (error) {
      console.error("Error al editar la instalación:", error);
      if (typeof showConfirmation === 'function') {
        showConfirmation("Error al editar la instalación");
      }
    }
  };

  if (!selectedInstallation) return null;

  return (
    <form onSubmit={handleFormSubmit} className={styles.formularioPanel}>
      <h2>Editar Instalación</h2>
      <label htmlFor="company">Empresa</label>
      <input
        type="text"
        id="company"
        name="company"
        value={selectedInstallation.company || ''}
        onChange={handleChange}
        placeholder="Escribe el nombre de la empresa"
      />
      {errors.company && <p className={styles.error}>{errors.company}</p>}
      <label htmlFor="address">Dirección</label>
      <input
        type="text"
        id="address"
        name="address"
        value={selectedInstallation.address || ''}
        onChange={handleChange}
        placeholder="Escribe la dirección de la instalación"
      />
      {errors.address && <p className={styles.error}>{errors.address}</p>}
      <label htmlFor="floorSector">Piso/Sector</label>
      <input
        type="text"
        id="floorSector"
        name="floorSector"
        value={selectedInstallation.floorSector || ''}
        onChange={handleChange}
        placeholder="Escribe piso/sector de la instalación o edificio"
      />
      {errors.floorSector && <p className={styles.error}>{errors.floorSector}</p>}
      <label htmlFor="postalCode">Código Postal</label>
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        value={selectedInstallation.postalCode || ''}
        onChange={handleChange}
        placeholder="Escribe el código postal"
      />
      {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
      <label htmlFor="city">Ciudad</label>
      <input
        type="text"
        id="city"
        name="city"
        value={selectedInstallation.city || ''}
        onChange={handleChange}
        placeholder="Escribe la ciudad"
      />
      {errors.city && <p className={styles.error}>{errors.city}</p>}
      <label htmlFor="province">Provincia</label>
      <input
        type="text"
        id="province"
        name="province"
        value={selectedInstallation.province || ''}
        onChange={handleChange}
        placeholder="Escribe la provincia"
      />
      {errors.province && <p className={styles.error}>{errors.province}</p>}
      <label htmlFor="installationType">Tipo de instalación</label>
      <select
        id="installationType"
        name="installationType"
        value={selectedInstallation.installationType || ''}
        onChange={handleChange}
        placeholder="Seleccion un tipo de instalación"
      >
        <option value="">Seleccione un tipo</option>
        {Array.isArray(categories) && categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {errors.installationType && <p className={styles.error}>{errors.installationType}</p>}

      <div className={styles.contenedorBotonesEditar}>
        <button type="submit" className={styles.botonGuardar}>
          Guardar
        </button>
        <button type="button" onClick={onClose} className={styles.botonCancelarModal}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioEditar;
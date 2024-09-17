import React from "react";
import styles from "@/styles/Home.module.css";
import { handleInputChange, handleTextareaInput } from "@/components/panel/ListaInstalaciones/utils/validaciones.jsx";

const FormularioEditar = ({ 
  selectedInstallation, 
  errors, 
  handleSubmit, 
  onClose,
  handleEditInputChange,
  setErrors,
  categories
}) => {
  const handleChange = (e) => {
    const { updatedInstallation, newErrors } = handleInputChange(e, selectedInstallation);
    handleEditInputChange(e);
    setErrors(newErrors);
  };

  const handleTextarea = (e) => {
    const { updatedInstallation, newErrors } = handleTextareaInput(e, selectedInstallation);
    handleEditInputChange(e);
    setErrors(newErrors);
  };

  if (!selectedInstallation) return null;

  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
      <h2>Editar Instalación</h2>
      <label htmlFor="company">Empresa</label>
      <input
        type="text"
        id="company"
        name="company"
        value={selectedInstallation.company || ''}
        onChange={handleChange}
      />
      {errors.company && <p className={styles.error}>{errors.company}</p>}
      <label htmlFor="address">Dirección</label>
      <input
        type="text"
        id="address"
        name="address"
        value={selectedInstallation.address || ''}
        onChange={handleChange}
      />
      {errors.address && <p className={styles.error}>{errors.address}</p>}
      <label htmlFor="floorSector">Piso/Sector</label>
      <input
        type="text"
        id="floorSector"
        name="floorSector"
        value={selectedInstallation.floorSector || ''}
        onChange={handleChange}
      />
      {errors.floorSector && <p className={styles.error}>{errors.floorSector}</p>}
      <label htmlFor="postalCode">Código Postal</label>
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        value={selectedInstallation.postalCode || ''}
        onChange={handleChange}
      />
      {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
      <label htmlFor="city">Ciudad</label>
      <input
        type="text"
        id="city"
        name="city"
        value={selectedInstallation.city || ''}
        onChange={handleChange}
      />
      {errors.city && <p className={styles.error}>{errors.city}</p>}
      <label htmlFor="province">Provincia</label>
      <input
        type="text"
        id="province"
        name="province"
        value={selectedInstallation.province || ''}
        onChange={handleChange}
      />
      {errors.province && <p className={styles.error}>{errors.province}</p>}
      <label htmlFor="installationType">Tipo de instalación</label>
      <select
        id="installationType"
        name="installationType"
        value={selectedInstallation.installationType || ''}
        onChange={handleChange}
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
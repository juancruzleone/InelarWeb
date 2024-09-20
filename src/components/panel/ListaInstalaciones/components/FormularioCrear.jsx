import React from "react";
import styles from "@/styles/Home.module.css";
import { handleInputChange, handleTextareaInput } from "@/components/panel/ListaInstalaciones/utils/validaciones.jsx";

const FormularioCrear = ({ 
  newInstallation, 
  errors, 
  handleSubmit, 
  onClose,
  categories,
  handleInputChange: parentHandleInputChange,
  setErrors
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const { updatedInstallation, newErrors } = handleInputChange(e, newInstallation);
    parentHandleInputChange(e);
    if (setErrors) {
      setErrors(newErrors);
    }
  };

  const handleTextarea = (e) => {
    const { name, value } = e.target;
    const { updatedInstallation, newErrors } = handleTextareaInput(e, newInstallation);
    parentHandleInputChange(e);
    if (setErrors) {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
      <label htmlFor="company">Empresa:</label>
      <input
        type="text"
        id="company"
        name="company"
        value={newInstallation.company || ''}
        onChange={handleChange}
        placeholder="Escribe el nombre de la empresa"
      />
      {errors.company && <p className={styles.error}>{errors.company}</p>}
      
      <label htmlFor="address">Dirección:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={newInstallation.address || ''}
        onChange={handleChange}
        placeholder="Escribe la dirección de la instalación"
      />
      {errors.address && <p className={styles.error}>{errors.address}</p>}
      
      <label htmlFor="floorSector">Piso/Sector:</label>
      <input
        type="text"
        id="floorSector"
        name="floorSector"
        value={newInstallation.floorSector || ''}
        onChange={handleChange}
        placeholder="Escribe piso/sector de la instalación o edificio"
      />
      {errors.floorSector && <p className={styles.error}>{errors.floorSector}</p>}
      
      <label htmlFor="postalCode">Código Postal:</label>
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        value={newInstallation.postalCode || ''}
        onChange={handleChange}
        placeholder="Escribe el código postal"
      />
      {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
      
      <label htmlFor="city">Ciudad:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={newInstallation.city || ''}
        onChange={handleChange}
        placeholder="Escribe la ciudad"
      />
      {errors.city && <p className={styles.error}>{errors.city}</p>}
      
      <label htmlFor="province">Provincia:</label>
      <input
        type="text"
        id="province"
        name="province"
        value={newInstallation.province || ''}
        onChange={handleChange}
        placeholder="Escribe la provincia"
      />
      {errors.province && <p className={styles.error}>{errors.province}</p>}
      
      <label htmlFor="installationType">Tipo de instalación:</label>
      <select
        id="installationType"
        name="installationType"
        value={newInstallation.installationType || ''}
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
          Crear
        </button>
        <button type="button" onClick={onClose} className={styles.botonCancelarModal}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioCrear;
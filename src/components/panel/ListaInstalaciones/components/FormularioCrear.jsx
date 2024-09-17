import React from "react";
import styles from "@/styles/Home.module.css";

const FormularioCrear = ({ 
  newInstallation, 
  errors, 
  handleSubmit, 
  onClose,
  categories,
  handleInputChange,
  setErrors
}) => {
  const handleChange = (e) => {
    handleInputChange(e);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
        <label htmlFor="company">Empresa:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={newInstallation.company}
          onChange={handleChange}
        />
        {errors.company && <p className={styles.error}>{errors.company}</p>}
        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={newInstallation.address}
          onChange={handleChange}
        />
        {errors.address && <p className={styles.error}>{errors.address}</p>}
        <label htmlFor="floorSector">Piso/Sector:</label>
        <input
          type="text"
          id="floorSector"
          name="floorSector"
          value={newInstallation.floorSector}
          onChange={handleChange}
        />
        {errors.floorSector && <p className={styles.error}>{errors.floorSector}</p>}
        <label htmlFor="postalCode">Código Postal:</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={newInstallation.postalCode}
          onChange={handleChange}
        />
        {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={newInstallation.city}
          onChange={handleChange}
        />
        {errors.city && <p className={styles.error}>{errors.city}</p>}
        <label htmlFor="province">Provincia:</label>
        <input
          type="text"
          id="province"
          name="province"
          value={newInstallation.province}
          onChange={handleChange}
        />
        {errors.province && <p className={styles.error}>{errors.province}</p>}
        <label htmlFor="installationType">Tipo de instalación:</label>
        <select
          id="installationType"
          name="installationType"
          value={newInstallation.installationType}
          onChange={handleChange}
        >
          <option value="">Seleccione un tipo</option>
          {categories.map((category, index) => (
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
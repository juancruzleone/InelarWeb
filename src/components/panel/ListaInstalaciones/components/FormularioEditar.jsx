import React from "react";
import styles from "@/styles/Home.module.css";

const FormularioEditar = ({ 
  selectedInstallation, 
  errors, 
  handleInputChange, 
  handleSubmit, 
  onClose 
}) => {
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
          onChange={handleInputChange}
        />
        {errors.company && <p className={styles.error}>{errors.company}</p>}
        <label htmlFor="address">Dirección</label>
        <input
          type="text"
          id="address"
          name="address"
          value={selectedInstallation.address || ''}
          onChange={handleInputChange}
        />
        {errors.address && <p className={styles.error}>{errors.address}</p>}
        <label htmlFor="floorSector">Piso/Sector</label>
        <input
          type="text"
          id="floorSector"
          name="floorSector"
          value={selectedInstallation.floorSector || ''}
          onChange={handleInputChange}
        />
        {errors.floorSector && <p className={styles.error}>{errors.floorSector}</p>}
        <label htmlFor="postalCode">Código Postal</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={selectedInstallation.postalCode || ''}
          onChange={handleInputChange}
        />
        {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          id="city"
          name="city"
          value={selectedInstallation.city || ''}
          onChange={handleInputChange}
        />
        {errors.city && <p className={styles.error}>{errors.city}</p>}
        <label htmlFor="province">Provincia</label>
        <input
          type="text"
          id="province"
          name="province"
          value={selectedInstallation.province || ''}
          onChange={handleInputChange}
        />
        {errors.province && <p className={styles.error}>{errors.province}</p>}
        <label htmlFor="installationType">Tipo de instalación</label>
        <input
          type="text"
          id="installationType"
          name="installationType"
          value={selectedInstallation.installationType || ''}
          onChange={handleInputChange}
        />
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
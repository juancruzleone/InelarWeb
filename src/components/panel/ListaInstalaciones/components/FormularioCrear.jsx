import React, { useState } from "react";
import styles from "@/styles/Home.module.css";

const FormularioCrear = ({ 
  newInstallation, 
  errors, 
  handleInputChange, 
  handleSubmit, 
  onClose 
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
      <h2>Crear Instalación</h2>

      <div>
        <label htmlFor="company">Empresa:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={newInstallation.company}
          onChange={handleInputChange}
        />
        {errors.company && <p className={styles.error}>{errors.company}</p>}
      </div>

      <div>
        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={newInstallation.address}
          onChange={handleInputChange}
        />
        {errors.address && <p className={styles.error}>{errors.address}</p>}
      </div>

      <div>
        <label htmlFor="floorSector">Piso/Sector:</label>
        <input
          type="text"
          id="floorSector"
          name="floorSector"
          value={newInstallation.floorSector}
          onChange={handleInputChange}
        />
        {errors.floorSector && <p className={styles.error}>{errors.floorSector}</p>}
      </div>

      <div>
        <label htmlFor="postalCode">Código Postal:</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={newInstallation.postalCode}
          onChange={handleInputChange}
        />
        {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
      </div>

      <div>
        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={newInstallation.city}
          onChange={handleInputChange}
        />
        {errors.city && <p className={styles.error}>{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="province">Provincia:</label>
        <input
          type="text"
          id="province"
          name="province"
          value={newInstallation.province}
          onChange={handleInputChange}
        />
        {errors.province && <p className={styles.error}>{errors.province}</p>}
      </div>

      <div>
        <label htmlFor="installationType">Tipo de instalación:</label>
        <input
          type="text"
          id="installationType"
          name="installationType"
          value={newInstallation.installationType}
          onChange={handleInputChange}
        />
        {errors.installationType && <p className={styles.error}>{errors.installationType}</p>}
      </div>

      <div className={styles.contenedorBotonesEditar}>
        <button type="submit" className={styles.botonEliminarProducto}>
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

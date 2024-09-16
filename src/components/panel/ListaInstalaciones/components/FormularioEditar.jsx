import React from "react";
import styles from "@/styles/Home.module.css";

const FormularioEditar = ({ 
  initialValues, 
  errors, 
  handleInputChange, 
  handleSubmit, 
  onClose 
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
      <h2>Editar Instalación</h2>

      <div>
        <label htmlFor="company">Empresa</label>
        <input
          type="text"
          id="company"
          name="company"
          value={initialValues.company}
          onChange={handleInputChange}
        />
        {errors.company && <p className={styles.error}>{errors.company}</p>}
      </div>

      <div>
        <label htmlFor="address">Dirección</label>
        <input
          type="text"
          id="address"
          name="address"
          value={initialValues.address}
          onChange={handleInputChange}
        />
        {errors.address && <p className={styles.error}>{errors.address}</p>}
      </div>

      <div>
        <label htmlFor="floorSector">Piso/Sector</label>
        <input
          type="text"
          id="floorSector"
          name="floorSector"
          value={initialValues.floorSector}
          onChange={handleInputChange}
        />
        {errors.floorSector && <p className={styles.error}>{errors.floorSector}</p>}
      </div>

      <div>
        <label htmlFor="postalCode">Código Postal</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={initialValues.postalCode}
          onChange={handleInputChange}
        />
        {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}
      </div>

      <div>
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          id="city"
          name="city"
          value={initialValues.city}
          onChange={handleInputChange}
        />
        {errors.city && <p className={styles.error}>{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="province">Provincia</label>
        <input
          type="text"
          id="province"
          name="province"
          value={initialValues.province}
          onChange={handleInputChange}
        />
        {errors.province && <p className={styles.error}>{errors.province}</p>}
      </div>

      <div>
        <label htmlFor="installationType">Tipo de instalación</label>
        <input
          type="text"
          id="installationType"
          name="installationType"
          value={initialValues.installationType}
          onChange={handleInputChange}
        />
        {errors.installationType && <p className={styles.error}>{errors.installationType}</p>}
      </div>

      <div className={styles.contenedorBotonesEditar}>
        <button type="submit" className={styles.botonEliminarProducto}>
          Guardar Cambios
        </button>
        <button type="button" onClick={onClose} className={styles.botonCancelarModal}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioEditar;

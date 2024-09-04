import React from 'react';
import styles from '@/styles/Home.module.css';

const SolicitarProvisionesForm = ({ formData, formErrors, handleChange, handleSubmit, productList }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formulario}>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        className={formErrors.nombre ? styles.inputError : ""}
      />
      {formErrors.nombre && <p className={styles.errorServicios}>{formErrors.nombre}</p>}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={formErrors.email ? styles.inputError : ""}
      />
      {formErrors.email && <p className={styles.errorServicios}>{formErrors.email}</p>}

      <label htmlFor="telefono">Teléfono:</label>
      <input
        type="number"
        id="telefono"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        className={formErrors.telefono ? styles.inputError : ""}
      />
      {formErrors.telefono && <p className={styles.errorServicios}>{formErrors.telefono}</p>}

      <label htmlFor="direccion">Dirección:</label>
      <input
        type="text"
        id="direccion"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        className={formErrors.direccion ? styles.inputError : ""}
      />
      {formErrors.direccion && <p className={styles.errorServicios}>{formErrors.direccion}</p>}

      <label htmlFor="dispositivo">Dispositivo:</label>
      <select
        id="dispositivo"
        name="dispositivo"
        value={formData.dispositivo}
        onChange={handleChange}
        className={formErrors.dispositivo ? styles.inputError : ""}
      >
        <option value="">Selecciona una opción</option>
        {productList.length > 0 ? (
          productList.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))
        ) : (
          <option disabled>Cargando productos...</option>
        )}
      </select>
      {formErrors.dispositivo && <p className={styles.errorServicios}>{formErrors.dispositivo}</p>}

      <label htmlFor="cantidad">Cantidad:</label>
      <input
        type="number"
        id="cantidad"
        name="cantidad"
        value={formData.cantidad}
        onChange={handleChange}
        min="1"
        className={formErrors.cantidad ? styles.inputError : ""}
      />
      {formErrors.cantidad && <p className={styles.errorServicios}>{formErrors.cantidad}</p>}

      <label htmlFor="fecha">Fecha deseada:</label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        className={formErrors.fecha ? styles.inputError : ""}
      />
      {formErrors.fecha && <p className={styles.errorServicios}>{formErrors.fecha}</p>}

      <button type="submit" className={styles.botonSolicitudServicio}>
        Enviar solicitud
      </button>
      {formErrors.general && <p className={styles.errorServicios}>{formErrors.general}</p>}
    </form>
  );
};

export default SolicitarProvisionesForm;
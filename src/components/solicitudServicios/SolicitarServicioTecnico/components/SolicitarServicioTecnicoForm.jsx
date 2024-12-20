import styles from '@/styles/SolicitudServicio.module.css';

const FormularioServicioTecnico = ({ formData, formErrors, productos, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formulario}>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Escribe tu nombre"
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
        placeholder="Escribe tu email"
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
        placeholder="Escribe tu télefono"
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
        placeholder="Escribe tu dirección"
        className={formErrors.direccion ? styles.inputError : ""}
      />
      {formErrors.direccion && <p className={styles.errorServicios}>{formErrors.direccion}</p>}

      <label htmlFor="problema">Problema:</label>
      <textarea
        id="problema"
        name="problema"
        value={formData.problema}
        onChange={handleChange}
        placeholder="Describe el problema"
        className={formErrors.problema ? styles.inputError : ""}
      />
      {formErrors.problema && <p className={styles.errorServicios}>{formErrors.problema}</p>}

      <label htmlFor="dispositivo">Dispositivo:</label>
      <select
        id="dispositivo"
        name="dispositivo"
        value={formData.dispositivo}
        onChange={handleChange}
        placeholder="Selecciona una opción"
        className={formErrors.dispositivo ? styles.inputError : ""}
      >
        <option value="">Selecciona una opción</option>
        {productos.map((producto) => (
          <option key={producto.id} value={producto.name}>
            {producto.name}
          </option>
        ))}
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
        placeholder="Escribe la cantidad"
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
        placeholder="Selecciona una fecha"
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

export default FormularioServicioTecnico;
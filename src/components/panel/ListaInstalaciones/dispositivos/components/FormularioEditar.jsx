import React from "react";
import styles from "@/styles/ListaDispositivos.module.css";

const FormularioEditar = ({ 
  selectedDevice, 
  errors, 
  handleSubmit, 
  onClose,
  handleEditInputChange,
}) => {
  if (!selectedDevice) return null;

  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={selectedDevice.nombre || ''}
        onChange={handleEditInputChange}
        placeholder="Escribe el nombre del dispositivo"
      />
      {errors.nombre && <p className={styles.error3}>{errors.nombre}</p>}
      <label htmlFor="ubicacion">Ubicación</label>
      <input
        type="text"
        id="ubicacion"
        name="ubicacion"
        value={selectedDevice.ubicacion || ''}
        onChange={handleEditInputChange}
        placeholder="Escribe la ubicación del dispositivo"
      />
      {errors.ubicacion && <p className={styles.error3}>{errors.ubicacion}</p>}
      <label htmlFor="categoria">Categoria</label>
      <select
        id="categoria"
        name="categoria"
        value={selectedDevice.categoria || ''}
        onChange={handleEditInputChange}
        className={styles.selectEditarDispositivo}
      >
        <option value="">Seleccione un categoria</option>
        <option value="detector">detector</option>
        <option value="extintor">extintor</option>
        <option value="manguera">manguera</option>
        <option value="central">central</option>
      </select>
      {errors.categoria && <p className={styles.error3}>{errors.categoria}</p>}

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
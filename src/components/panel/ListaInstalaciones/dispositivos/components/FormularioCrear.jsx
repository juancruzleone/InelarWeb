import React from "react";
import styles from "@/styles/ListaDispositivos.module.css";

const FormularioCrear = ({ 
  newDevice, 
  errors, 
  handleSubmit, 
  onClose,
  handleInputChange
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel} id={styles.formularioCrearDispositivo}>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={newDevice.nombre}
        onChange={handleInputChange}
        placeholder="Escribe el nombre del dispositivo"
      />
      {errors.nombre && <p className={styles.error3}>{errors.nombre}</p>}
      <label htmlFor="ubicacion">Ubicación:</label>
      <input
        type="text"
        id="ubicacion"
        name="ubicacion"
        value={newDevice.ubicacion}
        onChange={handleInputChange}
        placeholder="Escribe la ubicación del dispositivo"
      />
      {errors.ubicacion && <p className={styles.error3}>{errors.ubicacion}</p>}
      <label htmlFor="categoria">Categoria:</label>
      <select
        id="categoria"
        name="categoria"
        value={newDevice.categoria}
        onChange={handleInputChange}
        className={styles.selectCrearDispositivo}
      >
        <option value="">Seleccione una categoria</option>
        <option value="detector">detector</option>
        <option value="extintor">extintor</option>
        <option value="manguera">manguera</option>
        <option value="central">central</option>
      </select>
      {errors.categoria && <p className={styles.error3}>{errors.categoria}</p>}
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
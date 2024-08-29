import React from "react";
import useClienteSeleccionado from "@/components/panel/ListaClientes/hooks/useClienteSeleccionado.jsx";
import validarFormulario from "@/components/panel/ListaClientes/utils/validaciones.jsx";
import styles from "@/styles/Home.module.css";
import ModalConfirmacion from '@/components/panel/ListaClientes/components/ModalConfirmacion.jsx';

const FormularioCrearCliente = ({ onRequestClose, token, role, actualizarClientes }) => {
  const {
    nuevoCliente,
    handleChange,
    handleSubmitCrear,
    errores,
    setErrores,
    modalConfirmacion,
    setModalConfirmacion,
    mensajeConfirmacion,
  } = useClienteSeleccionado(null, null, onRequestClose, token, role, actualizarClientes);

  const handleInputChange = (e) => {
    handleChange(e);
    const { name, value } = e.target;
    const newErrors = validarFormulario({ ...nuevoCliente, [name]: value });
    setErrores(newErrors);
  };

  return (
    <>
      <form onSubmit={handleSubmitCrear} className={styles.formularioPanel}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={nuevoCliente.name}
          onChange={handleInputChange}
        />
        {errores.name && <p className={styles.errorPanel}>{errores.name}</p>}

        <label htmlFor="category" className={styles.categoria}>Categoría</label>
        <input
          type="text"
          id="category"
          name="category"
          value={nuevoCliente.category}
          onChange={handleInputChange}
        />
        {errores.category && <p className={styles.errorPanel}>{errores.category}</p>}

        <div className={styles.contenedorBotonesEditar}>
          <button type="submit" className={styles.botonGuardar}>
            Guardar
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className={styles.botonCancelarModal}
          >
            Cancelar
          </button>
        </div>
      </form>
      <ModalConfirmacion
        isOpen={modalConfirmacion}
        onRequestClose={() => setModalConfirmacion(false)}
        mensaje={mensajeConfirmacion}
      />
    </>
  );
};

export default FormularioCrearCliente;
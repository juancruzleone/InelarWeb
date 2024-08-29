import React from 'react';
import styles from '@/styles/Home.module.css';
import useClienteSeleccionado from "@/components/panel/ListaClientes/hooks/useClienteSeleccionado.jsx";
import ModalConfirmacion from '@/components/panel/ListaClientes/components/ModalConfirmacion.jsx';

const FormularioEditarCliente = ({
  clienteSeleccionado,
  setClienteSeleccionado,
  handleCerrarModal,
  token,
  role,
  actualizarClientes,  // Recibir la función actualizarClientes
}) => {
  const {
    handleChange,
    handleSubmitEditar,
    errores,
    modalConfirmacion,
    setModalConfirmacion,
    mensajeConfirmacion,
  } = useClienteSeleccionado(
    clienteSeleccionado,
    setClienteSeleccionado,
    handleCerrarModal,
    token,
    role,
    actualizarClientes  // Pasar la función actualizarClientes al hook
  );

  return (
    <>
      <form onSubmit={handleSubmitEditar}>
        <div className={styles.formularioPanel}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={clienteSeleccionado?.name || ''}
            onChange={handleChange}
          />
          {errores.name && <p className={styles.error}>{errores.name}</p>}
        </div>
        <div className={styles.formularioPanel}>
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={clienteSeleccionado?.category || ''}
            onChange={handleChange}
          />
          {errores.category && <p className={styles.error}>{errores.category}</p>}
        </div>
        {errores.submit && <p className={styles.error}>{errores.submit}</p>}
        <div className={styles.contenedorBotonesEditar}>
          <button type="submit" className={styles.botonGuardar}>Guardar</button>
          <button type="button" onClick={handleCerrarModal} className={styles.botonCancelar}>Cancelar</button>
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

export default FormularioEditarCliente;
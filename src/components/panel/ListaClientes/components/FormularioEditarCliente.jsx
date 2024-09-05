import React from 'react';
import styles from '@/styles/Home.module.css';
import useClienteSeleccionado from "@/components/panel/ListaClientes/hooks/useClienteSeleccionado.jsx";
import ModalConfirmacion from '@/components/panel/ListaClientes/components/ModalConfirmacion.jsx';

const FormularioEditarCliente = ({
  selectedClient,
  setSelectedClient,
  handleCloseModal,
  token,
  role,
  refreshClients,
}) => {
  const {
    handleChange,
    handleEditSubmit,
    errors,
    confirmationModal,
    setConfirmationModal,
    confirmationMessage,
  } = useClienteSeleccionado(
    selectedClient,
    setSelectedClient,
    handleCloseModal,
    token,
    role,
    refreshClients
  );

  return (
    <>
      <form onSubmit={handleEditSubmit}>
        <div className={styles.formularioPanel}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={selectedClient?.name || ''}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.formularioPanel}>
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={selectedClient?.category || ''}
            onChange={handleChange}
          />
          {errors.category && <p className={styles.error}>{errors.category}</p>}
        </div>
        {errors.submit && <p className={styles.error}>{errors.submit}</p>}
        <div className={styles.contenedorBotonesEditar}>
          <button type="submit" className={styles.botonGuardar}>Guardar</button>
          <button type="button" onClick={handleCloseModal} className={styles.botonCancelar}>Cancelar</button>
        </div>
      </form>
      <ModalConfirmacion
        isOpen={confirmationModal}
        onRequestClose={() => setConfirmationModal(false)}
        mensaje={confirmationMessage}
      />
    </>
  );
};

export default FormularioEditarCliente;
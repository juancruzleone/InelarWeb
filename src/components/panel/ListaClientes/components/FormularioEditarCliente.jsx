import { useState, useEffect } from 'react';
import styles from '@/styles/ListaClientes.module.css';
import useClienteSeleccionado from "@/components/panel/ListaClientes/hooks/useClienteSeleccionado.jsx";
import { getClients } from "@/components/panel/ListaClientes/services/ListaClienteService.jsx";
import ModalConfirmacion from '@/components/panel/ListaClientes/components/ModalConfirmacion.jsx';

const FormularioEditarCliente = ({
  selectedClient,
  setSelectedClient,
  handleCloseModal,
  token,
  role,
  refreshClients,
}) => {
  const [categorias, setCategorias] = useState([]);
  
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

  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientes = await getClients(token, role);
        const categoriasUnicas = [...new Set(clientes.map(cliente => cliente.category))];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Error al obtener las categorías de los clientes", error);
      }
    };

    fetchClients();
  }, [token, role]);

  return (
    <>
      <form onSubmit={handleEditSubmit}>
        <div className={styles.formularioPanel}>
          <label htmlFor="name" id={styles.labelNombre}>Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={selectedClient?.name || ''}
            onChange={handleChange}
            placeholder='Escribe el nombre del cliente'
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.formularioPanel}>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={selectedClient?.category || ''}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
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

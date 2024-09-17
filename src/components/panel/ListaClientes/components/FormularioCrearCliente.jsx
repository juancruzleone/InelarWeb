import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import useClienteSeleccionado from "@/components/panel/ListaClientes/hooks/useClienteSeleccionado.jsx";
import { getClients } from "@/components/panel/ListaClientes/services/ListaClienteService.jsx";
import validarFormulario from "@/components/panel/ListaClientes/utils/validaciones.jsx";

const FormularioCrearCliente = ({ onRequestClose, token, role, refreshClients, setConfirmationModal, setConfirmationMessage }) => {
  const [categorias, setCategorias] = useState([]);
  const [errores, setErrores] = useState({});

  const {
    newClient,
    handleChange,
    handleCreateSubmit
  } = useClienteSeleccionado(null, null, onRequestClose, token, role, refreshClients);

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

  const handleInputChange = (e) => {
    handleChange(e);
    const { name, value } = e.target;
    const newErrors = validarFormulario({ ...newClient, [name]: value });
    setErrores(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleCreateSubmit(e);
    if (success) {
      setConfirmationMessage('Cliente creado con éxito.');
      setConfirmationModal(true);
      onRequestClose(); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        id="name"
        name="name"
        value={newClient.name || ''}
        onChange={handleInputChange}
        placeholder='Escribe el nombre del cliente'
      />
      {errores.name && <p className={styles.errorPanel}>{errores.name}</p>}

      <label htmlFor="category" className={styles.categoria}>Categoría</label>
      <select
        id="category"
        name="category"
        value={newClient.category || ''}
        onChange={handleInputChange}
      >
        <option value="">Seleccione una categoría</option>
        {categorias.map((categoria, index) => (
          <option key={index} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
      {errores.category && <p className={styles.errorPanel}>{errores.category}</p>}

      <div className={styles.contenedorBotonesEditar}>
        <button type="submit" className={styles.botonGuardar}>
          Guardar
        </button>
        <button type="button" onClick={onRequestClose} className={styles.botonCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioCrearCliente;
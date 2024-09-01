import { useState } from 'react';
import { editarCliente, crearCliente, eliminarCliente } from '@/components/panel/ListaClientes/services/ListaClienteService.jsx';
import validarFormulario from '@/components/panel/ListaClientes/utils/validaciones.jsx';

const useClienteSeleccionado = (
  clienteSeleccionado,
  setClienteSeleccionado,
  handleCerrarModal,
  token,
  role,
  actualizarClientes
) => {
  const [errores, setErrores] = useState({});
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const [nuevoCliente, setNuevoCliente] = useState({
    name: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (clienteSeleccionado) {
      setClienteSeleccionado((prev) => ({ ...prev, [name]: value }));
    } else {
      setNuevoCliente((prev) => ({ ...prev, [name]: value }));
    }

    const cliente = clienteSeleccionado || nuevoCliente;
    const newErrors = validarFormulario({ ...cliente, [name]: value });
    setErrores(newErrors);
  };

  const handleSubmitCrear = async (e) => {
    e.preventDefault();
    setErrores({});
    
    const erroresValidados = validarFormulario(nuevoCliente);
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      return;
    }

    try {
      const resultado = await crearCliente(nuevoCliente, token, role);
      setMensajeConfirmacion(resultado.message || 'Cliente creado exitosamente');
      setModalConfirmacion(true);
      handleCerrarModal();
      actualizarClientes();
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      setErrores({ submit: error.message || 'Error al crear el cliente' });
    }
  };

  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    setErrores({});

    const erroresValidados = validarFormulario(clienteSeleccionado);
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      return;
    }

    try {
      const resultado = await editarCliente(clienteSeleccionado, token, role);
      setMensajeConfirmacion(resultado.message || 'Cliente editado exitosamente');
      setModalConfirmacion(true);
      handleCerrarModal();
      actualizarClientes();
    } catch (error) {
      console.error('Error al editar el cliente:', error);
      setErrores({ submit: error.message || 'Error al editar el cliente' });
    }
  };

  const handleEliminarCliente = async (idCliente) => {
    try {
      const resultado = await eliminarCliente(idCliente, token, role);
      setMensajeConfirmacion(resultado.message || 'Cliente eliminado exitosamente');
      setModalConfirmacion(true);
      actualizarClientes();
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      setErrores({ submit: error.message || 'Error al eliminar el cliente' });
    }
  };

  return {
    errores,
    modalConfirmacion,
    setModalConfirmacion,
    mensajeConfirmacion,
    setMensajeConfirmacion,
    handleChange,
    handleSubmitCrear,
    handleSubmitEditar,
    handleEliminarCliente,
    nuevoCliente,
    setErrores,
  };
};

export default useClienteSeleccionado;
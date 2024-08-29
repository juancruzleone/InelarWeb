// useClientes.jsx
import { useState, useEffect, useCallback } from "react";
import { obtenerClientes, eliminarCliente } from "@/components/panel/ListaClientes/services/ListaClienteService.jsx";

const useClientes = (token, role) => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const actualizarClientes = useCallback(async () => {
    setLoading(true);
    const data = await obtenerClientes(token, role);
    setClientes(data);
    setLoading(false);
  }, [token, role]);

  useEffect(() => {
    actualizarClientes();
  }, [actualizarClientes]);

  useEffect(() => {
    const filtered = clientes.filter((cliente) => {
      return (
        (buscar === "" || cliente.name.toLowerCase().includes(buscar.toLowerCase())) &&
        (categoriaSeleccionada === "Todos" || cliente.category === categoriaSeleccionada)
      );
    });
    setClientesFiltrados(filtered);

    const categoriasUnicas = [
      ...new Set(clientes.map((cliente) => cliente.category)),
    ];
    setCategorias(categoriasUnicas);
  }, [clientes, buscar, categoriaSeleccionada]);

  const handleCrearCliente = () => {
    setModalCrear(true);
  };

  const handleEliminarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEliminar(true);
  };

  const eliminarClienteSeleccionado = async (idCliente) => {
    try {
      await eliminarCliente(idCliente, token, role);
      setMensajeConfirmacion("Cliente eliminado exitosamente");
      setModalConfirmacion(true);
      actualizarClientes(); // Actualizar la lista de clientes después de eliminar uno
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      setMensajeConfirmacion("Error al eliminar el cliente");
      setModalConfirmacion(true);
    }
  };

  const handleCerrarModal = () => {
    setModalCrear(false);
    setModalEditar(false);
    setModalEliminar(false);
    setModalConfirmacion(false);
    setClienteSeleccionado(null);
  };

  return {
    clientesFiltrados,
    categorias,
    buscar,
    setBuscar,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    loading,
    handleCrearCliente,
    handleEliminarCliente,
    modalCrear,
    modalEditar,
    modalEliminar,
    modalConfirmacion,
    handleCerrarModal,
    mensajeConfirmacion,
    setModalEditar,
    clienteSeleccionado,
    setClienteSeleccionado,
    setClientes,
    actualizarClientes,
    eliminarClienteSeleccionado, // Exponer la función para eliminar cliente
  };
};

export default useClientes;
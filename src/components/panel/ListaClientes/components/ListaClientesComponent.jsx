import React, { useState } from 'react';
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import EditarClienteModal from '@/components/panel/ListaClientes/components/ModalEditar.jsx';
import ModalConfirmacion from '@/components/panel/ListaClientes/components/ModalConfirmacion.jsx';
import { validarFormulario } from '@/components/panel/ListaClientes/utils/validaciones';

const ListaClientesComponent = ({ clientesFiltrados, loading, handleEliminarCliente }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState({});
  const [errores, setErrores] = useState({});
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

  const handleEditarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEditar(true);
  };

  const handleCerrarModal = () => {
    setModalEditar(false);
    setClienteSeleccionado({});
    setErrores({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteSeleccionado((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEditar = (e) => {
    e.preventDefault();
    const validaciones = validarFormulario(clienteSeleccionado);
    
    if (Object.keys(validaciones).length > 0) {
      setErrores(validaciones);
      return;
    }

    // Aquí puedes agregar la lógica para guardar los cambios en el cliente
    // Por ejemplo, podrías hacer una llamada a una API para actualizar el cliente en el servidor
    // Simulamos la actualización con un timeout
    setTimeout(() => {
      setModalConfirmacion(true);
      handleCerrarModal();
    }, 1000);
  };

  return (
    <div className={styles.contenedorClientes}>
      {loading ? (
        <p>Cargando clientes...</p>
      ) : clientesFiltrados.length > 0 ? (
        clientesFiltrados.map((cliente, index) => (
          <div key={index} className={styles.tarjetaProductoPanelClientes}>
            <h3>{cliente.name}</h3>
            <div className={styles.contenedorBotonesClientes}>
              <button onClick={() => handleEditarCliente(cliente)} className={styles.botonEditar}>
                <Image src="/editar.svg" alt="Editar" width={10} height={10} />
              </button>
              <button onClick={() => handleEliminarCliente(cliente)} className={styles.botonEliminar}>
                <Image src="/eliminar.svg" alt="Eliminar" width={10} height={10} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.textoBuscadorPanelClientes}>No se encontraron clientes</p>
      )}
      
      <EditarClienteModal
        modalEditar={modalEditar}
        handleCerrarModal={handleCerrarModal}
        clienteSeleccionado={clienteSeleccionado}
        handleChange={handleChange}
        handleSubmitEditar={handleSubmitEditar}
        errores={errores}
      />

      <ModalConfirmacion
        modalConfirmacion={modalConfirmacion}
        mensajeConfirmacion={mensajeConfirmacion}
        setModalConfirmacion={setModalConfirmacion}
      />
    </div>
  );
};

export default ListaClientesComponent;
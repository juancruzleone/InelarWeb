import React, { useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import useClientes from "@/components/panel/ListaClientes/hooks/useClientes.jsx";
import ModalCrear from "@/components/panel/ListaClientes/components/ModalCrear.jsx";
import ModalEditar from "@/components/panel/ListaClientes/components/ModalEditar.jsx";
import ModalEliminar from "@/components/panel/ListaClientes/components/ModalEliminar.jsx";
import ModalConfirmacion from "@/components/panel/ListaClientes/components/ModalConfirmacion.jsx";

const ListaClientes = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = userData.token;
  const role = userData.cuenta.role;

  const {
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
    actualizarClientes,
    eliminarClienteSeleccionado,
  } = useClientes(token, role);

  const handleOpenEditModal = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEditar(true);
  };

  return (
    <div className={styles.contenedorPagina}>
      <h2 className={styles.tituloPaginasPanel}>Clientes</h2>
      <button onClick={handleCrearCliente} className={styles.botonCrearModal}>
        Crear cliente
      </button>
      <input
        type="text"
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        className={styles.buscadorPanel}
        placeholder="Busca el nombre del cliente"
        aria-label="Buscar clientes"
      />
      <div className={styles.posicionSeccionProductos}>
        <div className={styles.contenedorCategorias}>
          {['Todos', ...categorias].map((categoria, index) => (
            <div
              key={index}
              className={`${styles.contenedorCategoria} ${
                categoria === categoriaSeleccionada
                  ? styles.categoriaSeleccionada
                  : ""
              }`}
              onClick={() => setCategoriaSeleccionada(categoria)}
            >
              <p>{categoria ? categoria.charAt(0).toUpperCase() + categoria.slice(1) : ''}</p>
            </div>
          ))}
        </div>

        <div className={styles.contenedorClientes}>
          {loading ? (
            <p>Cargando clientes...</p>
          ) : clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cliente, index) => (
              <div key={index} className={styles.tarjetaProductoPanelClientes}>
                <h3>{cliente.name}</h3>
                <div className={styles.contenedorBotonesClientes}>
                  <button
                    onClick={() => handleOpenEditModal(cliente)}
                    className={styles.botonEditar}
                  >
                    <Image
                      src="/editar.svg"
                      alt="Edit"
                      width={10}
                      height={10}
                    />
                  </button>
                  <button
                    onClick={() => handleEliminarCliente(cliente)}
                    className={styles.botonEliminar}
                  >
                    <Image
                      src="/eliminar.svg"
                      alt="Delete"
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.textoBuscadorPanelClientes}>
                No se encontraron clientes
            </p>
          )}
        </div>
      </div>

      <ModalCrear 
        isOpen={modalCrear} 
        onRequestClose={handleCerrarModal} 
        token={token}
        role={role}
        actualizarClientes={actualizarClientes} 
      />
      <ModalEditar
        modalEditar={modalEditar}
        handleCerrarModal={handleCerrarModal}
        clienteSeleccionado={clienteSeleccionado}
        setClienteSeleccionado={setClienteSeleccionado}
        token={token}
        role={role}
        actualizarClientes={actualizarClientes}  
      />
      <ModalEliminar
        isOpen={modalEliminar}
        onRequestClose={handleCerrarModal}
        onConfirm={() => {
          eliminarClienteSeleccionado(clienteSeleccionado._id); 
          handleCerrarModal();
        }}
      />
      <ModalConfirmacion
        isOpen={modalConfirmacion}
        onRequestClose={handleCerrarModal}
        mensaje={mensajeConfirmacion}
      />
    </div>
  );
};

export default ListaClientes;
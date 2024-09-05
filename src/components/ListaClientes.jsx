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
    filteredClients,
    categories,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    loading,
    handleCreateClient,
    handleDeleteClient,
    createModal,
    editModal,
    deleteModal,
    confirmationModal,
    handleCloseModal,
    confirmationMessage,
    setEditModal,
    selectedClient,
    setSelectedClient,
    refreshClients,
    deleteSelectedClient,
  } = useClientes(token, role);

  const handleOpenEditModal = (client) => {
    setSelectedClient(client);
    setEditModal(true);
  };

  return (
    <div className={styles.contenedorPagina}>
      <h2 className={styles.tituloPaginasPanel}>Clientes</h2>
      <button onClick={handleCreateClient} className={styles.botonCrearModal}>
        Crear cliente
      </button>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.buscadorPanel}
        placeholder="Busca el nombre del cliente"
        aria-label="Buscar clientes"
      />
      <div className={styles.posicionSeccionProductos}>
        <div className={styles.contenedorCategorias}>
          {['Todos', ...categories].map((category, index) => (
            <div
              key={index}
              className={`${styles.contenedorCategoria} ${
                category === selectedCategory
                  ? styles.categoriaSeleccionada
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <p>{category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}</p>
            </div>
          ))}
        </div>

        <div className={styles.contenedorClientes}>
          {loading ? (
            <p>Cargando clientes...</p>
          ) : filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <div key={index} className={styles.tarjetaProductoPanelClientes}>
                <h3>{client.name}</h3>
                <div className={styles.contenedorBotonesClientes}>
                  <button
                    onClick={() => handleOpenEditModal(client)}
                    className={styles.botonEditar}
                  >
                    <Image
                      src="/editar.svg"
                      alt="Editar"
                      width={10}
                      height={10}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client)}
                    className={styles.botonEliminar}
                  >
                    <Image
                      src="/eliminar.svg"
                      alt="Eliminar"
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
        isOpen={createModal} 
        onRequestClose={handleCloseModal} 
        token={token}
        role={role}
        refreshClients={refreshClients} 
      />
      <ModalEditar
        editModal={editModal}
        handleCloseModal={handleCloseModal}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        token={token}
        role={role}
        refreshClients={refreshClients}  
      />
      <ModalEliminar
        isOpen={deleteModal}
        onRequestClose={handleCloseModal}
        onConfirm={() => {
          deleteSelectedClient(selectedClient._id); 
          handleCloseModal();
        }}
      />
      <ModalConfirmacion
        isOpen={confirmationModal}
        onRequestClose={handleCloseModal}
        mensaje={confirmationMessage}
      />
    </div>
  );
};

export default ListaClientes;

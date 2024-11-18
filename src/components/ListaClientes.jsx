import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/ListaClientes.module.css";
import useClientes from "@/components/panel/ListaClientes/hooks/useClientes.jsx";
import ModalCrear from "@/components/panel/ListaClientes/components/ModalCrear.jsx";
import ModalEditar from "@/components/panel/ListaClientes/components/ModalEditar.jsx";
import ModalEliminar from "@/components/panel/ListaClientes/components/ModalEliminar.jsx";
import ModalConfirmacion from "@/components/panel/ListaClientes/components/ModalConfirmacion.jsx";
import { useTheme } from '@/components/ThemeProvider'

const ListaClientes = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = userData.token;
  const role = userData.cuenta.role;
  const { theme } = useTheme()

  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const {
    filteredClients,
    categories,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    loading,
    handleCreateClient,
    createModal,
    editModal,
    handleCloseModal,
    setEditModal,
    selectedClient,
    setSelectedClient,
    refreshClients,
    deleteSelectedClient,
  } = useClientes(token, role);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleOpenEditModal = (client) => {
    setSelectedClient(client);
    setEditModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModal(false);
    setConfirmationMessage('');
  };

  const showConfirmationModal = (message) => {
    setConfirmationMessage(message);
    setConfirmationModal(true);
  };

  const handleCreateClientWithConfirmation = async () => {
    const success = await handleCreateClient();
    if (success) {
      showConfirmationModal('Cliente creado exitosamente');
    }
  };

  const handleDeleteClientWithConfirmation = (client) => {
    setSelectedClient(client);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSelectedClient(selectedClient._id);
      setDeleteModalOpen(false);
      showConfirmationModal('Cliente eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      showConfirmationModal('Error al eliminar el cliente');
    }
  };

  return (
    <div className={styles.contenedorPagina} data-theme={theme}>
      <h2 className={styles.tituloPaginasPanel}>Clientes</h2>
      <button onClick={handleCreateClientWithConfirmation} className={styles.botonCrearModal}>
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
        {isMobile ? (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.selectCategoria}
          >
            {['Todos', ...categories].map((category, index) => (
              <option key={index} value={category}>
                {category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}
              </option>
            ))}
          </select>
        ) : (
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
        )}

        <div className={styles.contenedorClientes}>
          {loading ? (
            <p id={styles.cargandoClientes}>Cargando clientes...</p>
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
                    onClick={() => handleDeleteClientWithConfirmation(client)}
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
        setConfirmationModal={setConfirmationModal}
        setConfirmationMessage={setConfirmationMessage}
      />
      <ModalEditar
        editModal={editModal}
        handleCloseModal={handleCloseModal}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        token={token}
        role={role}
        refreshClients={refreshClients}
        setConfirmationModal={setConfirmationModal}
        setConfirmationMessage={setConfirmationMessage}
      />
      <ModalEliminar
        isOpen={deleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <ModalConfirmacion
        isOpen={confirmationModal}
        onRequestClose={handleCloseConfirmationModal}
        mensaje={confirmationMessage}
      />
    </div>
  );
};

export default ListaClientes;
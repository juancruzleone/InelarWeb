import { useState, useEffect, useCallback } from "react";
import { getClients, deleteClient } from '@/components/panel/ListaClientes/services/ListaClienteService.jsx';

const useClients = (token, role) => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  const refreshClients = useCallback(async () => {
    setLoading(true);
    const data = await getClients(token, role);
    setClients(data);
    setLoading(false);
  }, [token, role]);

  useEffect(() => {
    refreshClients();
  }, [refreshClients]);

  useEffect(() => {
    const filtered = clients.filter((client) => {
      return (
        (search === "" || client.name.toLowerCase().includes(search.toLowerCase())) &&
        (selectedCategory === "Todos" || client.category === selectedCategory)
      );
    });
    setFilteredClients(filtered);

    const uniqueCategories = [
      ...new Set(clients.map((client) => client.category)),
    ];
    setCategories(uniqueCategories);
  }, [clients, search, selectedCategory]);

  const handleCreateClient = () => {
    setCreateModal(true);
  };

  const handleDeleteClient = (client) => {
    setSelectedClient(client);
    setDeleteModal(true);
  };

  const deleteSelectedClient = async (idClient) => {
    try {
      await deleteClient(idClient, token, role);
      setConfirmationMessage("Cliente eliminado exitosamente");
      setConfirmationModal(true);
      refreshClients();
    } catch (error) {
      console.error('Error eliminando cliente:', error);
      setConfirmationMessage("Error eliminando cliente");
      setConfirmationModal(true);
    }
  };

  const handleCloseModal = () => {
    setCreateModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setConfirmationModal(false);
    setSelectedClient(null);
  };

  return {
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
    setClients,
    refreshClients,
    deleteSelectedClient,
  };
};

export default useClients;
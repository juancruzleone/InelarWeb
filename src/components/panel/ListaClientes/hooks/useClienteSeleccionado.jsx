import { useState } from 'react';
import { updateClient, createClient, deleteClient } from '@/components/panel/ListaClientes/services/ListaClienteService.jsx';
import validateForm from '@/components/panel/ListaClientes/utils/validaciones.jsx';

const useSelectedClient = (
  selectedClient,
  setSelectedClient,
  handleCloseModal,
  token,
  role,
  refreshClients
) => {
  const [errors, setErrors] = useState({});
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [newClient, setNewClient] = useState({
    name: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedClient) {
      setSelectedClient((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewClient((prev) => ({ ...prev, [name]: value }));
    }

    const client = selectedClient || newClient;
    const newErrors = validateForm({ ...client, [name]: value });
    setErrors(newErrors);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    const validatedErrors = validateForm(newClient);
    if (Object.keys(validatedErrors).length > 0) {
      setErrors(validatedErrors);
      return;
    }

    try {
      const result = await createClient(newClient, token, role);
      setConfirmationMessage(result.message || 'Cliente creado exitosamente');
      setConfirmationModal(true);
      handleCloseModal();
      refreshClients();
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      setErrors({ submit: error.message || 'Error al crear el cliente' });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validatedErrors = validateForm(selectedClient);
    if (Object.keys(validatedErrors).length > 0) {
      setErrors(validatedErrors);
      return;
    }

    try {
      const result = await updateClient(selectedClient, token, role);
      setConfirmationMessage(result.message || 'Cliente editado exitosamente');
      setConfirmationModal(true);
      handleCloseModal();
      refreshClients();
    } catch (error) {
      console.error('Error al editar el cliente:', error);
      setErrors({ submit: error.message || 'Error al editar el cliente' });
    }
  };

  const handleDeleteClient = async (idClient) => {
    try {
      const result = await deleteClient(idClient, token, role);
      setConfirmationMessage(result.message || 'Cliente eliminado exitosamente');
      setConfirmationModal(true);
      refreshClients();
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      setErrors({ submit: error.message || 'Error al eliminar el cliente' });
    }
  };

  return {
    errors,
    confirmationModal,
    setConfirmationModal,
    confirmationMessage,
    setConfirmationMessage,
    handleChange,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteClient,
    newClient,
    setErrors,
  };
};

export default useSelectedClient;
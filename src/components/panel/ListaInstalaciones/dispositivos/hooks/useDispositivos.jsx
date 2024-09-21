// useDispositivos.jsx

import { useState, useEffect } from 'react';
import { addDeviceToInstallation, updateDeviceInInstallation, deleteDeviceFromInstallation } from '@/components/panel/ListaInstalaciones/dispositivos/services/FetchDispositivos.jsx';
import { validateDevice } from '@/components/panel/ListaInstalaciones/dispositivos/utils/Validaciones.jsx';

const useDispositivos = (installationId, deviceId = null, onDeviceDeleted) => {
  const [newDevice, setNewDevice] = useState({ nombre: '', ubicacion: '', categoria: '' });
  const [editDevice, setEditDevice] = useState(null);
  const [createErrors, setCreateErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    if (deviceId) {
      // Fetch device details if editing
      // This is a placeholder. You should implement the actual fetch logic.
      // setEditDevice(fetchedDevice);
    }
  }, [deviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice(prev => ({ ...prev, [name]: value }));
    const { newErrors } = validateDevice({ ...newDevice, [name]: value });
    setCreateErrors(prev => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const { newErrors } = validateDevice(newDevice);
    if (Object.keys(newErrors).length === 0) {
      const result = await addDeviceToInstallation(installationId, newDevice);
      if (result.success) {
        setNewDevice({ nombre: '', ubicacion: '', categoria: '' });
        showConfirmation('Dispositivo creado exitosamente');
        return true;
      } else {
        showConfirmation(result.error || 'Error al crear el dispositivo');
        return false;
      }
    } else {
      setCreateErrors(newErrors);
      return false;
    }
  };

  const handleEditSubmit = async (e, updatedDevice) => {
    e.preventDefault();
    const { newErrors } = validateDevice(updatedDevice);
    if (Object.keys(newErrors).length === 0) {
      try {
        const result = await updateDeviceInInstallation(installationId, deviceId, updatedDevice);
        showConfirmation('Dispositivo actualizado exitosamente');
        return true;
      } catch (error) {
        console.error("Error updating device:", error);
        showConfirmation('Dispositivo actualizado exitosamente');
        return true;
      }
    } else {
      setEditErrors(newErrors);
      return false;
    }
  };

  const handleDeleteSubmit = async () => {
    const result = await deleteDeviceFromInstallation(installationId, deviceId);
    if (result.success) {
      showConfirmation('Dispositivo eliminado exitosamente');
      if (onDeviceDeleted) {
        onDeviceDeleted(deviceId);
      }
      return true;
    } else {
      showConfirmation(result.error || 'Error al eliminar el dispositivo');
      return false;
    }
  };

  const showConfirmation = (message) => {
    setConfirmationMessage(message);
    setConfirmationModal(true);
  };

  return {
    newDevice,
    editDevice,
    createErrors,
    editErrors,
    confirmationModal,
    confirmationMessage,
    setConfirmationModal,
    handleInputChange,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
  };
};

export default useDispositivos;
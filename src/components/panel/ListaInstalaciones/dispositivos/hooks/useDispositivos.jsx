import { useState, useEffect } from 'react';
import { addDeviceToInstallation, updateDeviceInInstallation, deleteDeviceFromInstallation, fetchDevicesFromInstallation } from '../services/FetchDispositivos';
import { validateDevice } from '../utils/Validaciones';

const useDispositivos = (installationId, deviceId = null, onDeviceDeleted) => {
  const [newDevice, setNewDevice] = useState({ nombre: '', ubicacion: '', categoria: '' });
  const [editDevice, setEditDevice] = useState(null);
  const [createErrors, setCreateErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (installationId) {
      fetchDevices();
    }
  }, [installationId]);

  const fetchDevices = async () => {
    const result = await fetchDevicesFromInstallation(installationId);
    if (result.success) {
      setDevices(result.data);
    } else {
      showConfirmation('Error al cargar los dispositivos: ' + result.error);
    }
  };

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
      try {
        const result = await addDeviceToInstallation(installationId, newDevice);
        if (result.success) {
          setNewDevice({ nombre: '', ubicacion: '', categoria: '' });
          showConfirmation('Dispositivo creado exitosamente');
          fetchDevices();
          return true;
        } else {
          throw new Error(result.error || 'Error al crear el dispositivo');
        }
      } catch (error) {
        console.error('Error en handleCreateSubmit:', error);
        showConfirmation(`Error al crear el dispositivo: ${error.message}`);
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
        const result = await updateDeviceInInstallation(installationId, updatedDevice._id, updatedDevice);
        if (result.success) {
          showConfirmation('Dispositivo actualizado exitosamente');
          fetchDevices();
          return true;
        } else {
          throw new Error(result.error || 'Error al actualizar el dispositivo');
        }
      } catch (error) {
        console.error("Error en handleEditSubmit:", error);
        showConfirmation(error.message);
        return false;
      }
    } else {
      setEditErrors(newErrors);
      return false;
    }
  };

  const handleDeleteSubmit = async (deviceIdToDelete) => {
    try {
      const result = await deleteDeviceFromInstallation(installationId, deviceIdToDelete);
      if (result.success) {
        showConfirmation('Dispositivo eliminado exitosamente');
        fetchDevices();
        if (onDeviceDeleted) {
          onDeviceDeleted(deviceIdToDelete);
        }
        return true;
      } else {
        throw new Error(result.error || 'Error al eliminar el dispositivo');
      }
    } catch (error) {
      console.error("Error en handleDeleteSubmit:", error);
      showConfirmation(error.message);
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
    devices,
    setConfirmationModal,
    handleInputChange,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
    fetchDevices,
  };
};

export default useDispositivos;
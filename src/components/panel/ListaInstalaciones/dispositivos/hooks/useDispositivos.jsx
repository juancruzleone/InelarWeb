import { useState, useEffect } from 'react';
import { addDeviceToInstallation, updateDeviceInInstallation, deleteDeviceFromInstallation } from '@/components/panel/ListaInstalaciones/dispositivos/services/FetchDispositivos.jsx';
import { validateDevice } from '@/components/panel/ListaInstalaciones/dispositivos/utils/Validaciones.jsx';
import ModalConfirmacion from '@/components/panel/ListaInstalaciones/dispositivos/components/ModalConfirmacion.jsx';

const useDispositivos = (installationId, deviceId = null, onDeviceDeleted) => {
  const [newDevice, setNewDevice] = useState({ nombre: '', ubicacion: '', categoria: '' });
  const [editDevice, setEditDevice] = useState(null);
  const [createErrors, setCreateErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (deviceId) {
      // Aquí iría la lógica para obtener los detalles del dispositivo si se está editando
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
      setIsLoading(true);
      try {
        const result = await addDeviceToInstallation(installationId, newDevice);
        if (!result.error) {
          setNewDevice({ nombre: '', ubicacion: '', categoria: '' });
          showConfirmation('Dispositivo creado exitosamente');
          return true;
        } else {
          showConfirmation(`Error al crear el dispositivo: ${result.error}`);
          return false;
        }
      } catch (error) {
        console.error('Error al crear el dispositivo:', error);
        showConfirmation(`Error al crear el dispositivo: ${error.message}`);
        return false;
      } finally {
        setIsLoading(false);
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
      setIsLoading(true);
      try {
        const result = await updateDeviceInInstallation(installationId, deviceId, updatedDevice);
        if (!result.error) {
          showConfirmation('Dispositivo actualizado exitosamente');
          return true;
        } else {
          showConfirmation(`Error al actualizar el dispositivo: ${result.error}`);
          return false;
        }
      } catch (error) {
        console.error("Error al actualizar el dispositivo:", error);
        showConfirmation(`Error al actualizar el dispositivo: ${error.message}`);
        return false;
      } finally {
        setIsLoading(false);
      }
    } else {
      setEditErrors(newErrors);
      return false;
    }
  };

  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await deleteDeviceFromInstallation(installationId, deviceId);
      if (!result.error) {
        showConfirmation('Dispositivo eliminado exitosamente');
        if (onDeviceDeleted) {
          onDeviceDeleted(deviceId);
        }
        return true;
      } else {
        showConfirmation(`Error al eliminar el dispositivo: ${result.error}`);
        return false;
      }
    } catch (error) {
      console.error('Error al eliminar el dispositivo:', error);
      showConfirmation(`Error al eliminar el dispositivo: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
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
    isLoading,
    setConfirmationModal,
    handleInputChange,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
    ModalConfirmacion: (
      <ModalConfirmacion
        isOpen={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        message={confirmationMessage}
      />
    ),
  };
};

export default useDispositivos;
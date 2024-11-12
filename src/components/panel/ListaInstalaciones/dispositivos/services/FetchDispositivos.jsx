const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inelarweb-back.onrender.com/api/instalaciones';

const getToken = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { token } = JSON.parse(userData);
      return token;
    }
  }
  return null;
};

export const fetchDevicesFromInstallation = async (installationId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al obtener los dispositivos de la instalación');
    }

    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error en fetchDevicesFromInstallation:', error);
    return { error: error.message };
  }
};

export const addDeviceToInstallation = async (installationId, device) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(device),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al agregar el dispositivo a la instalación');
    }

    return data;
  } catch (error) {
    console.error('Error en addDeviceToInstallation:', error);
    return { error: error.message };
  }
};

export const updateDeviceInInstallation = async (installationId, deviceId, device) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos/${deviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(device),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al actualizar el dispositivo en la instalación');
    }

    return data;
  } catch (error) {
    console.error('Error en updateDeviceInInstallation:', error);
    return { error: error.message };
  }
};

export const deleteDeviceFromInstallation = async (installationId, deviceId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos/${deviceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al eliminar el dispositivo de la instalación');
    }

    return data;
  } catch (error) {
    console.error('Error en deleteDeviceFromInstallation:', error);
    return { error: error.message };
  }
};

export const getLastMaintenance = async (installationId, deviceId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos/${deviceId}/ultimo-mantenimiento`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al obtener el último mantenimiento');
    }

    return data;
  } catch (error) {
    console.error('Error en getLastMaintenance:', error);
    return { error: error.message };
  }
};
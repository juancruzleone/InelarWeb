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

// Fetch para obtener dispositivos de una instalación
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

    if (!response.ok) {
      throw new Error('Error al obtener los dispositivos de la instalación');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// Fetch para agregar un dispositivo a una instalación
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

    if (!response.ok) {
      throw new Error('Error al agregar el dispositivo a la instalación');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// Fetch para actualizar un dispositivo en una instalación
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

    if (!response.ok) {
      throw new Error('Error al actualizar el dispositivo en la instalación');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// Fetch para eliminar un dispositivo de una instalación
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

    if (!response.ok) {
      throw new Error('Error al eliminar el dispositivo de la instalación');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

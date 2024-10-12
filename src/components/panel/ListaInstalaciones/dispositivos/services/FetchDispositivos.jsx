const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2023/api/instalaciones';

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

const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(url, { ...options, headers });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'Error en la solicitud');
  }

  return data;
};

export const fetchDevicesFromInstallation = async (installationId) => {
  try {
    const data = await fetchWithAuth(`${API_URL}/${installationId}/dispositivos`);
    return { success: true, data };
  } catch (error) {
    console.error('Error en fetchDevicesFromInstallation:', error);
    return { success: false, error: error.message };
  }
};

export const addDeviceToInstallation = async (installationId, device) => {
  try {
    const data = await fetchWithAuth(`${API_URL}/${installationId}/dispositivos`, {
      method: 'POST',
      body: JSON.stringify(device),
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error en addDeviceToInstallation:', error);
    return { success: false, error: error.message };
  }
};

export const updateDeviceInInstallation = async (installationId, deviceId, device) => {
  try {
    const data = await fetchWithAuth(`${API_URL}/${installationId}/dispositivos/${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify(device),
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error en updateDeviceInInstallation:', error);
    return { success: false, error: error.message };
  }
};

export const deleteDeviceFromInstallation = async (installationId, deviceId) => {
  try {
    const data = await fetchWithAuth(`${API_URL}/${installationId}/dispositivos/${deviceId}`, {
      method: 'DELETE',
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error en deleteDeviceFromInstallation:', error);
    return { success: false, error: error.message };
  }
};
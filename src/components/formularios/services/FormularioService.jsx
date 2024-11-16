const API_BASE_URL = 'https://inelarweb-back.onrender.com/api';

const getUserData = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
  }
  return null;
};

export async function getDeviceForm(installationId, deviceId) {
  if (!installationId || !deviceId) {
    throw new Error('IDs de instalación y dispositivo son requeridos');
  }

  try {
    const userData = getUserData();
    if (!userData || !userData.token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const url = `${API_BASE_URL}/instalaciones/${installationId}/dispositivos/${deviceId}/formulario`;
    console.log('Obteniendo formulario desde:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de API:', errorData);
      throw new Error(errorData.error?.message || 'Error al obtener el formulario del dispositivo');
    }
    
    // Si el usuario no es admin, obtener el último mantenimiento
    if (userData.role !== 'admin') {
      const lastMaintenanceUrl = `${API_BASE_URL}/instalaciones/${installationId}/dispositivos/${deviceId}/ultimo-mantenimiento`;
      const maintenanceResponse = await fetch(lastMaintenanceUrl, {
        headers: {
          'Authorization': `Bearer ${userData.token}`,
        },
      });
      
      if (maintenanceResponse.ok) {
        const maintenanceData = await maintenanceResponse.json();
        const formData = await response.json();
        return {
          ...formData,
          lastMaintenance: maintenanceData
        };
      }
    }
    
    const data = await response.json();
    console.log('Datos del formulario recibidos:', data);
    return data;
  } catch (error) {
    console.error('Error en getDeviceForm:', error);
    throw error;
  }
}

export async function submitMaintenanceForm(installationId, deviceId, formData) {
  if (!installationId || !deviceId) {
    throw new Error('IDs de instalación y dispositivo son requeridos');
  }

  try {
    const userData = getUserData();
    if (!userData || !userData.token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const url = `${API_BASE_URL}/instalaciones/${installationId}/dispositivos/${deviceId}/mantenimiento`;
    console.log('Enviando formulario a:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        ...formData,
        userRole: userData.role // Incluir el rol del usuario en los datos del formulario
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Error al enviar el formulario de mantenimiento');
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    return data;
  } catch (error) {
    console.error('Error en submitMaintenanceForm:', error);
    throw error;
  }
}
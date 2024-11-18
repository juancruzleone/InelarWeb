const API_BASE_URL = 'https://inelarweb-back.onrender.com/api';

const getUserData = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      return {
        token: parsedUserData.token,
        role: parsedUserData.cuenta?.role
      };
    }
  }
  return null;
};

export async function getLastMaintenance(installationId, deviceId) {
  try {
    const url = `${API_BASE_URL}/instalaciones/${installationId}/dispositivos/${deviceId}/ultimo-mantenimiento`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Error al obtener el último mantenimiento');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en getLastMaintenance:', error);
    throw error;
  }
}

export async function getDeviceForm(installationId, deviceId) {
  if (!installationId || !deviceId) {
    throw new Error('IDs de instalación y dispositivo son requeridos');
  }

  try {
    const userData = getUserData();
    
    // Si no hay userData, el usuario no está logueado, o no es admin, obtener directamente el último mantenimiento
    if (!userData || !userData.role || userData.role !== 'admin') {
      const maintenanceData = await getLastMaintenance(installationId, deviceId);
      return {
        data: { lastMaintenance: maintenanceData },
        userRole: userData?.role || 'user'
      };
    }

    // Si es admin, intentar obtener el formulario
    const response = await fetch(`${API_BASE_URL}/instalaciones/${installationId}/dispositivos/${deviceId}/formulario`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Error al obtener el formulario del dispositivo');
    }
    
    const formData = await response.json();
    return { data: formData, userRole: userData.role };
  } catch (error) {
    console.error('Error en getDeviceForm:', error);
    // Si hay un error de autorización, intentar obtener el último mantenimiento
    const maintenanceData = await getLastMaintenance(installationId, deviceId);
    return {
      data: { lastMaintenance: maintenanceData },
      userRole: 'user'
    };
  }
}

export async function submitMaintenanceForm(installationId, deviceId, formData) {
  if (!installationId || !deviceId) {
    throw new Error('IDs de instalación y dispositivo son requeridos');
  }

  const userData = getUserData();
  if (!userData || !userData.token || userData.role !== 'admin') {
    throw new Error('No tienes permisos para enviar el formulario');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/instalaciones/${installationId}/dispositivos/${deviceId}/mantenimiento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        ...formData,
        userRole: userData.role
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Error al enviar el formulario de mantenimiento');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en submitMaintenanceForm:', error);
    throw error;
  }
}
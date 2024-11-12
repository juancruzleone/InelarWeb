const API_BASE_URL = 'https://inelarweb-back.onrender.com/api';

export async function getDeviceForm(installationId, deviceId) {
  if (!installationId || !deviceId) {
    throw new Error('IDs de instalación y dispositivo son requeridos');
  }

  try {
    const url = `${API_BASE_URL}/instalaciones/${installationId}/dispositivos/${deviceId}/formulario`;
    console.log('Obteniendo formulario desde:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de API:', errorData);
      throw new Error(errorData.error?.message || 'Error al obtener el formulario del dispositivo');
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
    const url = `${API_BASE_URL}/instalaciones/${installationId}/dispositivos/${deviceId}/mantenimiento`;
    console.log('Enviando formulario a:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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
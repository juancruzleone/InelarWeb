export async function getDeviceForm(installationId, deviceId) {
  if (!installationId || !deviceId) {
    throw new Error('IDs de instalación y dispositivo son requeridos');
  }

  try {
    const url = `https://inelarweb-back.onrender.com/api/instalaciones/${installationId}/dispositivos/${deviceId}/formulario`;
    console.log('Obteniendo formulario desde:', url);

    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de API:', errorData);
      throw new Error(errorData.error?.message || 'Error al obtener el formulario del dispositivo');
    }
    
    return await response.json();
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
    const url = `https://inelarweb-back.onrender.com/api/instalaciones/${installationId}/dispositivos/${deviceId}/mantenimiento`;
    
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

    return await response.json();
  } catch (error) {
    console.error('Error en submitMaintenanceForm:', error);
    throw error;
  }
}
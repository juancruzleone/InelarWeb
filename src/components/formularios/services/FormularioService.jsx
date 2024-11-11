export async function getDeviceForm(installationId, deviceId) {
  // Verificar que tenemos los IDs antes de hacer la llamada
  if (!installationId || !deviceId) {
    throw new Error('IDs de instalación y dispositivo son requeridos')
  }

  try {
    const response = await fetch(
      `https://inelarweb-back.onrender.com/api/instalaciones/${encodeURIComponent(installationId)}/dispositivos/${encodeURIComponent(deviceId)}/formulario`
    )
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error en getDeviceForm:', error)
    throw new Error('Error al obtener el formulario del dispositivo')
  }
}

export async function submitMaintenanceForm(installationId, deviceId, formData) {
  if (!installationId || !deviceId) {
    throw new Error('IDs de instalación y dispositivo son requeridos')
  }

  try {
    const response = await fetch(
      `https://inelarweb-back.onrender.com/api/instalaciones/${encodeURIComponent(installationId)}/dispositivos/${encodeURIComponent(deviceId)}/mantenimiento`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en submitMaintenanceForm:', error)
    throw new Error('Error al enviar el formulario de mantenimiento')
  }
}
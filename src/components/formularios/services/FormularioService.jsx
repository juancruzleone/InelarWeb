export async function getDeviceForm(installationId, deviceId) {
  const response = await fetch(`https://inelarweb-back.onrender.com/api/instalaciones/${installationId}/dispositivos/${deviceId}/formulario`)
  if (!response.ok) {
    throw new Error('Error al obtener el formulario del dispositivo')
  }
  return await response.json()
}

export async function submitMaintenanceForm(installationId, deviceId, formData) {
  const response = await fetch(`https://inelarweb-back.onrender.com/api/instalaciones/${installationId}/dispositivos/${deviceId}/mantenimiento`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  if (!response.ok) {
    throw new Error('Error al enviar el formulario de mantenimiento')
  }
  return await response.json()
}
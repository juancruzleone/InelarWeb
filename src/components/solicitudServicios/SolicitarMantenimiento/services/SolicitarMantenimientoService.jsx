const API_URL = 'https://inelarweb-back.onrender.com/api';

export const obtenerProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) {
    throw new Error('Error al obtener productos');
  }
  return await response.json();
};

export const enviarSolicitud = async (formData) => {
  const response = await fetch(`${API_URL}/servicios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error al enviar la solicitud: ${errorData.message}`);
  }

  return await response.json();
};
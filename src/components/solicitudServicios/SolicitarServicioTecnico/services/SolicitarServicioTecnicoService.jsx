const API_URL = 'https://inelarweb-back.onrender.com/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) {
    throw new Error('Error al obtener productos');
  }
  return await response.json();
};

export const submitRequest = async (formData) => {
  // Depuración: Mostrar los datos que se están enviando al backend
  console.log("Enviando datos:", formData);

  const response = await fetch(`${API_URL}/servicios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Revisar detalles del error
    console.error("Detalles del error:", errorData); // Depuración
    throw new Error(`Error al enviar la solicitud: ${errorData.message || 'Error desconocido'}`);
  }

  return await response.json();
};

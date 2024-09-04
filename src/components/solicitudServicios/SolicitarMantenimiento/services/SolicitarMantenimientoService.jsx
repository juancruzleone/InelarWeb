const API_URL = 'https://inelarweb-back.onrender.com/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  return await response.json();
};

export const submitRequest = async (formData) => {
  const response = await fetch(`${API_URL}/servicios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error submitting the request: ${errorData.message}`);
  }

  return await response.json();
};
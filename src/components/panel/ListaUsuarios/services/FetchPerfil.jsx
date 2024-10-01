const API_URL = 'https://inelarweb-back.onrender.com/api';

export const fetchPerfil = async (id) => {
  try {
    const userData = localStorage.getItem('userData');
    console.log('userData from localStorage:', userData);

    if (!userData) {
      throw new Error('No se encontró información de usuario en localStorage');
    }

    const parsedUserData = JSON.parse(userData);
    console.log('Parsed userData:', parsedUserData);

    if (!parsedUserData.token) {
      throw new Error('No se encontró el token de autenticación');
    }

    console.log('Token antes de la solicitud:', parsedUserData.token);

    const response = await fetch(`${API_URL}/cuentas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parsedUserData.token.trim()}`
      }
    });

    console.log('Respuesta del servidor:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error del servidor:', errorText);
      
      if (response.status === 401) {
        throw new Error('No autorizado');
      } else if (response.status === 404) {
        throw new Error('No se encontró el usuario');
      } else {
        throw new Error(errorText || 'Error en la respuesta del servidor');
      }
    }

    const data = await response.json();
    console.log('Datos recibidos:', data);
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
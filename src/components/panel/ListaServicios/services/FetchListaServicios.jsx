export async function fetchServices() {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData || !userData.token) {
      throw new Error('Token no encontrado en localStorage');
    }
    
    const response = await fetch("https://inelarweb-back.onrender.com/api/servicios", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`  
      }
    });

    if (!response.ok) {
      throw new Error('La respuesta de la red no fue satisfactoria');
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export async function updateServiceStatus(serviceId, estado) {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData || !userData.token) {
      throw new Error('Token no encontrado en localStorage');
    }

    const response = await fetch(`https://inelarweb-back.onrender.com/api/servicios/${serviceId}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`
      },
      body: JSON.stringify({ estado })
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el estado del servicio');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export async function fetchOrders() {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData || !userData.token) {
      throw new Error('Token no encontrado en localStorage');
    }
    
    const response = await fetch("http://localhost:2023/api/orders", {
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
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function updateOrderStatus(orderId, estado) {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData || !userData.token) {
      throw new Error('Token no encontrado en localStorage');
    }

    const response = await fetch(`http://localhost:2023/api/orders/${orderId}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`
      },
      body: JSON.stringify({ estado })
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el estado de la orden');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
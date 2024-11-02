export async function fetchOrders() {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.token) {
      throw new Error('Token no encontrado en localStorage');
    }
    const response = await fetch("https://inelarweb-back.onrender.com/api/orders", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener las órdenes');
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw error;
  }
}

export async function updateOrderStatus(orderId, estado) {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.token) {
      throw new Error('Token no encontrado en localStorage');
    }
    const response = await fetch(`https://inelarweb-back.onrender.com/api/order/${orderId}/estado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`
      },
      body: JSON.stringify({ estado })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el estado de la orden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el estado de la orden:', error);
    // Instead of throwing the error, we'll return an object indicating the failure
    return { success: false, error: error.message };
  }
}
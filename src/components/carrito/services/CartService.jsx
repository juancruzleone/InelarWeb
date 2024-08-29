export const fetchCheckout = async (cart, userData) => {
    try {
      const response = await fetch('http://localhost:2023/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito: cart, estado: 'nuevo', userId: userData.cuenta._id }),
      });
  
      const data = await response.json();
      if (data?.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Error durante el checkout:', error);
    }
  };
  
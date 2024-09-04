export const fetchCheckout = async (cart, userData) => {
  try {
    const response = await fetch('https://inelarweb-back.onrender.com/api/create-order', {
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
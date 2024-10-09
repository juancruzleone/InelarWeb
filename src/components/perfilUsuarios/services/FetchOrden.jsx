export const fetchUserOrders = async (id) => {
  try {
    const response = await fetch(`https://inelarweb-back.onrender.com/api/orders`);
    const data = await response.json();

    return data.filter(order => order.userId === id);
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error al cargar los pedidos del usuario");
  }
};
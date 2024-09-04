export const fetchProductos = async () => {
  const response = await fetch("https://inelarweb-back.onrender.com/api/productos");
  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }
  return response.json();
};

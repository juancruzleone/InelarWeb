export const fetchProductos = async () => {
    const response = await fetch("http://localhost:2023/api/productos");
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    return response.json();
  };
  
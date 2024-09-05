const searchProducts = (categoria, search, productos) => {
  let filtered = productos;

  if (categoria !== "Todos") {
    filtered = filtered.filter(
      (producto) => producto.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  if (search) {
    filtered = filtered.filter((producto) =>
      producto.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filtered;
};

// Add a default export
export default searchProducts;
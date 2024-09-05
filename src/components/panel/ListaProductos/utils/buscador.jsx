const searchProducts = (category, search, products) => {
  let filtered = products;

  if (category !== "Todos") {
    filtered = filtered.filter(
      (product) => product.categoria.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filtered;
};


export default searchProducts;
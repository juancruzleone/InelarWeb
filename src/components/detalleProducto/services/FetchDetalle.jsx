export const fetchProduct = async (id) => {
    const response = await fetch(`https://inelarweb-back.onrender.com/api/productos/${id}`);
    return response.json();
  };
  
  export const fetchProducts = async () => {
    const response = await fetch(`https://inelarweb-back.onrender.com/api/productos`);
    return response.json();
  };
  
  export const fetchRelatedProducts = (productos, categoria, id) => {
    return productos
      .filter(p => p.categoria === categoria && p._id !== id)
      .slice(0, 3);
  };
  
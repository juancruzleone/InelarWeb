export async function fetchProductoData(id) {
    try {
      const responseProducto = await fetch(`https://inelarweb-back.onrender.com/api/productos/${id}`);
      const producto = await responseProducto.json();
  
      if (!producto) {
        return { notFound: true };
      }
  
      const responseProductos = await fetch(`https://inelarweb-back.onrender.com/api/productos`);
      const productos = await responseProductos.json();
  
      const productosRelacionados = productos
        .filter(p => p.categoria === producto.categoria && p._id !== id)
        .slice(0, 3);
  
      return {
        producto,
        productosRelacionados,
      };
    } catch (error) {
      console.error('Error al obtener detalles del producto:', error);
      return { error };
    }
  }
  
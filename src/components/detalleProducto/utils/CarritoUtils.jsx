import Cookies from 'js-cookie';

export const addToCart = (id, producto) => {
  const carrito = Cookies.get('carrito') ? JSON.parse(Cookies.get('carrito')) : [];
  const productoExistente = carrito.find(item => item.id === id);

  if (productoExistente) {
    productoExistente.unidades += 1;
  } else {
    const nuevoProducto = {
      id,
      nombre: producto.name,
      categoria: producto.categoria,
      precio: producto.price,
      imagen: producto.imagen,
      unidades: 1
    };
    carrito.push(nuevoProducto);
  }

  Cookies.set('carrito', JSON.stringify(carrito));
};

import Cookies from 'js-cookie';

export const addToCart = (id, producto, cantidad = 1) => {
  const carrito = Cookies.get('carrito') ? JSON.parse(Cookies.get('carrito')) : [];
  const productoExistente = carrito.find(item => item.id === id);

  if (productoExistente) {
    productoExistente.unidades += cantidad;
  } else {
    const nuevoProducto = {
      id,
      nombre: producto.name,
      categoria: producto.categoria,
      precio: producto.price,
      imagen: producto.imagen,
      unidades: cantidad
    };
    carrito.push(nuevoProducto);
  }

  Cookies.set('carrito', JSON.stringify(carrito));
};

export const getCart = () => {
  return Cookies.get('carrito') ? JSON.parse(Cookies.get('carrito')) : [];
};

export const removeFromCart = (id) => {
  const carrito = getCart();
  const nuevoCarrito = carrito.filter(item => item.id !== id);
  Cookies.set('carrito', JSON.stringify(nuevoCarrito));
};

export const updateCartItemQuantity = (id, nuevaCantidad) => {
  const carrito = getCart();
  const productoExistente = carrito.find(item => item.id === id);

  if (productoExistente) {
    productoExistente.unidades = nuevaCantidad;
    if (nuevaCantidad <= 0) {
      removeFromCart(id);
    } else {
      Cookies.set('carrito', JSON.stringify(carrito));
    }
  }
};

export const clearCart = () => {
  Cookies.remove('carrito');
};
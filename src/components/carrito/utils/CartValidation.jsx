export const validateCart = (cart) => {
    if (!Array.isArray(cart)) {
      throw new Error('El carrito no es un array.');
    }
  
    if (cart.length === 0) {
      return 'El carrito está vacío.';
    }
  
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
  
      if (!item.nombre || typeof item.nombre !== 'string') {
        return `El producto en la posición ${i + 1} no tiene un nombre válido.`;
      }
  
      if (!item.precio || typeof item.precio !== 'number' || item.precio <= 0) {
        return `El producto "${item.nombre}" tiene un precio inválido.`;
      }
  
      if (!item.unidades || typeof item.unidades !== 'number' || item.unidades <= 0) {
        return `El producto "${item.nombre}" tiene una cantidad de unidades inválida.`;
      }
    }
  
    return null;  // No errors found
  };
  
  export const validateUserData = (userData) => {
    if (!userData) {
      return 'No se ha encontrado la información del usuario.';
    }
  
    if (!userData.cuenta || !userData.cuenta._id) {
      return 'El usuario no tiene un ID válido.';
    }
  
    return null;  // No errors found
  };
  
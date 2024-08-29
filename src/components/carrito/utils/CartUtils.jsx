import Cookies from 'js-cookie';

export const getSavedCart = () => {
  return Cookies.get('carrito') ? JSON.parse(Cookies.get('carrito')) : [];
};

export const getUserData = () => {
  const savedUserData = localStorage.getItem('userData');
  return savedUserData ? JSON.parse(savedUserData) : null;
};

export const clearCart = () => {
  Cookies.set('carrito', JSON.stringify([]));
};

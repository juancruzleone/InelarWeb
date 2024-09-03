import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSavedCart, getUserData, clearCart } from '@/components/carrito/utils/CartUtils';

const useCarrito = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    confirmOpen: false,
    deleteOpen: false,
    successOpen: false,
  });
  const [action, setAction] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  useEffect(() => {
    const savedCart = getSavedCart();
    setCart(savedCart);

    const userData = getUserData();
    setUserData(userData);

    if (Array.isArray(router.query.status) && router.query.status.includes('success')) {
      clearCart();
      setCart([]);
      setModalState({ ...modalState, successOpen: true });

      const cleanUrl = router.asPath.split('?')[0];
      router.replace(cleanUrl, undefined, { shallow: true });
    }
  }, [router.query.status]);

  const handleRemoveProduct = (index) => {
    if (cart[index].unidades > 1) {
      const newCart = [...cart];
      newCart[index].unidades -= 1;
      setCart(newCart);
    } else {
      setSelectedProductIndex(index);
      setModalState({ ...modalState, deleteOpen: true });
    }
  };

  const confirmRemoveProduct = () => {
    const newCart = [...cart];
    newCart.splice(selectedProductIndex, 1);
    setCart(newCart);
    setModalState({ ...modalState, deleteOpen: false });
  };

  const handleIncreaseUnits = (index) => {
    const newCart = [...cart];
    newCart[index].unidades += 1;
    setCart(newCart);
  };

  const handleEmptyCart = () => {
    setAction('emptyCart');
    setModalState({ ...modalState, confirmOpen: true });
  };

  const confirmEmptyCart = () => {
    clearCart();
    setCart([]);
    setModalState({ ...modalState, confirmOpen: false });
  };

  return {
    cart,
    userData,
    modalState,
    action,
    selectedProductIndex,
    setModalState,
    handleRemoveProduct,
    confirmRemoveProduct,
    handleIncreaseUnits,
    handleEmptyCart,
    confirmEmptyCart,
    setAction,
  };
};

export default useCarrito;

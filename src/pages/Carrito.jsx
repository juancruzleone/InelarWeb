import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/index';
import Footer from '@/components/Footer';
import CartItem from '@/components/carrito/components/ProductosCarrito';
import BotonCarrito from '@/components/carrito/components/BotonCarrito';
import ModalCarrito from '@/components/carrito/components/ModalCarrito';
import { validateCart, validateUserData } from '@/components/carrito/utils/ValidacionesCarrito.jsx';
import styles from '@/styles/Home.module.css';
import { fetchCheckout } from '@/components/carrito/services/FetchCarrito';
import useCarrito from '@/components/carrito/hooks/useCarrito';

const Carrito = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    cart,
    userData,
    modalState,
    action,
    setModalState,
    handleRemoveProduct,
    confirmRemoveProduct,
    handleIncreaseUnits,
    handleEmptyCart,
    confirmEmptyCart,
    setAction,
  } = useCarrito();

  useEffect(() => {
    const loadCartContent = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadCartContent();
  }, []);

  const handleCheckout = async () => {
    const userValidationError = validateUserData(userData);
    if (userValidationError) {
      setModalState({ ...modalState, isOpen: true });
      return;
    }

    const cartValidationError = validateCart(cart);
    if (cartValidationError) {
      alert(cartValidationError);
      return;
    }

    await fetchCheckout(cart, userData);
  };

  const handleConfirmAction = () => {
    if (action === 'emptyCart') {
      confirmEmptyCart();
    }
  };

  return (
    <Layout className={styles.app}>
      <Head>
        <title>Carrito | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloPaginas}>Carrito</h1>
      <div className={`${styles.contenedorSeccionCarrito} ${cart.length === 0 ? styles.contenedorSeccionCarritoVacio : ''}`}>
        <div className={`${styles.contenedorCarrito} ${cart.length === 0 ? styles.contenedorCarritoVacio : ''}`}>
          <h3>Productos en el carrito</h3>
          {isLoading ? (
            <p className={styles.cargandoCarrito}>Cargando carrito...</p>
          ) : cart.length === 0 ? (
            <p className={styles.mensajeCarritoVacio}>No hay productos en el carrito.</p>
          ) : (
            cart.map((producto, index) => (
              <CartItem
                key={index}
                producto={producto}
                index={index}
                onIncrease={handleIncreaseUnits}
                onRemove={handleRemoveProduct}
              />
            ))
          )}
        </div>
        {!isLoading && (
          <BotonCarrito 
            cart={cart} 
            onEmptyCart={handleEmptyCart} 
            onCheckout={handleCheckout} 
          />
        )}
      </div>
      <Footer />
      <ModalCarrito 
        modalState={modalState} 
        setModalState={setModalState} 
        action={action} 
        handleConfirmAction={handleConfirmAction} 
        confirmRemoveProduct={confirmRemoveProduct}
      />
    </Layout>
  );
};

export default Carrito;

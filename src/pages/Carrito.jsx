import Head from 'next/head';
import Layout from '@/components/Layout/index';
import Footer from '@/components/Footer';
import CartItem from '@/components/carrito/components/CartItem'; 
import CartButtons from '@/components/carrito/components/CartButtons'; 
import CartModals from '@/components/carrito/components/CartModals'; 
import { validateCart, validateUserData } from '@/components/carrito/utils/CartValidation'; 
import styles from '@/styles/Home.module.css';
import { fetchCheckout } from '@/components/carrito/services/CartService';
import useCartState from '@/components/carrito/components/CartState';

const Carrito = () => {
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
  } = useCartState();

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
          {cart.length === 0 ? (
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
        <CartButtons 
          cart={cart} 
          onEmptyCart={handleEmptyCart} 
          onCheckout={handleCheckout} 
        />
      </div>
      <Footer />
      <CartModals 
        modalState={modalState} 
        setModalState={setModalState} 
        action={action} 
        handleConfirmAction={handleConfirmAction} 
      />
    </Layout>
  );
};

export default Carrito;

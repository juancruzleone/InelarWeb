import Image from 'next/image';
import styles from '@/styles/Home.module.css';

const BotonCarrito = ({ cart, onEmptyCart, onCheckout }) => {
  if (cart.length === 0) return null;

  return (
    <div className={styles.cartButtons}>
      <button
        className={styles.botonVaciar}
        onClick={onEmptyCart}
      >
        <Image src="/eliminar.svg" alt="Vaciar carrito" width={40} height={40} />
      </button>
      <button
        className={styles.botonIrCheckout}
        onClick={onCheckout}
      >
        Proceder al checkout
      </button>
    </div>
  );
};

export default BotonCarrito;

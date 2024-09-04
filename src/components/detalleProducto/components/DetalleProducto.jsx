import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

const DetalleProducto = ({ producto, handleAgregarAlCarrito }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAgregarProducto = () => {
    handleAgregarAlCarrito();
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 3000);
  };

  return (
    <div className={styles.contenedorDetalleProducto}>
      <div className={styles.contenedorProducto}>
        <Image
          src={producto.imagen}
          alt={producto.alt}
          width={150}
          height={180}
          className={styles.imagenProductoDetalle}
        />
      </div>
      <div className={styles.contenidoProducto}>
        <div className={styles.contenidoDetalle}>
          <h1 className={styles.nombreProductoDetalle}>{producto.name}</h1>
          <p className={styles.categoriaDetalle}>{producto.categoria}</p>
          <p className={styles.precioDetalle}>${producto.price}</p>
          <a href="#" onClick={handleAgregarProducto}>Agregar al carrito</a>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;

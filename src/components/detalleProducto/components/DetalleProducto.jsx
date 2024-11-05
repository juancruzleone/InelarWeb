import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/DetalleProducto.module.css';

export default function DetalleProducto({ producto, handleAgregarAlCarrito, isAdmin }) {
  const [cantidad, setCantidad] = useState(1);

  const handleAgregarProducto = () => {
    handleAgregarAlCarrito(cantidad);
  };

  const handleCantidadChange = (e) => {
    setCantidad(parseInt(e.target.value, 10));
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
          {!isAdmin && (
            <>
              <div className={styles.cantidadContainer}>
                <label htmlFor="cantidad">Cantidad:</label>
                <input
                  type="number"
                  id="cantidad"
                  min="1"
                  value={cantidad}
                  onChange={handleCantidadChange}
                  className={styles.cantidadInput}
                />
              </div>
              <a href="#" onClick={handleAgregarProducto}>Agregar al carrito</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
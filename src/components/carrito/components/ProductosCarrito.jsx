import Image from 'next/image';
import styles from '@/styles/Home.module.css';

const ProductosCarrito = ({ producto, index, onIncrease, onRemove }) => {
  return (
    <div key={index} className={styles.tarjetaProductoCarrito}>
      <div className={styles.imagenProductoDetalleCarrito}>
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          width={150}
          height={180}
        />
      </div>
      <div className={styles.detalleProductoCarrito}>
        <div>
          <p className={styles.nombreProductoCarrito}>{producto.nombre}</p>
          <p className={styles.categoriaProductoCarrito}>{producto.categoria}</p>
          <p>${producto.precio}</p>
        </div>
        <div className={styles.unidadesProductoCarrito}>
          <p><span className={styles.unidadesCarrito}>Unidades:</span>{producto.unidades}</p>
        </div>
      </div>
      <button
        className={styles.botonSumar}
        onClick={() => onIncrease(index)}
      >
        <Image src="/suma2.svg" alt="Icono sumar unidades" width={20} height={20} />
      </button>
      <button
        className={styles.botonEliminar}
        onClick={() => onRemove(index)}
      >
        <Image src="/menos2.svg" alt="Icono eliminar unidades" width={20} height={20} />
      </button>
    </div>
  );
};

export default ProductosCarrito;

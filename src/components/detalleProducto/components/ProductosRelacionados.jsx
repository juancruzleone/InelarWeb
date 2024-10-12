import Image from 'next/image';
import styles from '@/styles/DetalleProducto.module.css';

const ProductosRelacionados = ({ productosRelacionados, handleVerMas }) => {
  return (
    <div className={styles.contenedorProductosRelacionados}>
      <h2>Productos relacionados</h2>
      <div className={styles.productosRelacionados}>
        {productosRelacionados.map((relacionado) => (
          <div key={relacionado._id} className={styles.productoRelacionado}>
            <Image
              src={relacionado.imagen}
              alt={relacionado.alt}
              width={100}
              height={120}
              className={styles.imagenProductoRelacionado}
            />
            <p>{relacionado.name}</p>
            <button onClick={() => handleVerMas(relacionado._id)}>Ver más</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosRelacionados;

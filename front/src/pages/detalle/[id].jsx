// [id].jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/layout';
import Footer from '@/components/Footer';
import styles from '@/styles/Home.module.css';
import Modal from 'react-modal';
import Cookies from 'js-cookie';

const DetalleProducto = ({ producto }) => {
  const router = useRouter();
  const { id } = router.query;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAgregarAlCarrito = () => {
    const carrito = Cookies.get('carrito') ? JSON.parse(Cookies.get('carrito')) : [];
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
      productoExistente.unidades += 1;
    } else {
      const nuevoProducto = {
        id,
        nombre: producto.name,
        categoria: producto.categoria,
        precio: producto.price,
        imagen: producto.imagen,
        unidades: 1
      };
      carrito.push(nuevoProducto);
    }

    Cookies.set('carrito', JSON.stringify(carrito));
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 1000);
  };

  return (
    <Layout className={styles.app}>
      <div className={styles.contenedorDetalleProducto}>
        <div className={styles.contenedorProducto}>
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            width={150}
            height={180}
            className={styles.imagenProductoDetalle}
          />
        </div>
        <div className={styles.contenidoProducto}>
          <div className={styles.contenidoDetalle}>
            <h3 className={styles.nombreProductoDetalle}>{producto.name}</h3>
            <p className={styles.categoriaDetalle}>{producto.categoria}</p>
            <p className={styles.precioDetalle}>{producto.price}</p>
            <a href="#" onClick={handleAgregarAlCarrito}>Agregar al carrito</a>
          </div>
        </div>
      </div>
      <div className={styles.contenedorDescripcionProducto}>
        <h4>Descripción</h4>
        <p>{producto.description}</p>
      </div>
      <Footer></Footer>
      <Modal
        isOpen={modalIsOpen}
        className={styles.Modal}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Producto agregado al carrito"
      >
        <h2>Producto agregado al carrito</h2>
      </Modal>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  try {
    const response = await fetch(`http://localhost:2023/api/productos/${id}`);
    const producto = await response.json();

    if (!producto) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        producto,
      },
    };
  } catch (error) {
    console.error('Error al obtener detalles del producto:', error);

    return {
      notFound: true,
    };
  }
}

export default DetalleProducto;

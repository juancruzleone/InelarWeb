import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout';
import Footer from '@/components/Footer';
import styles from '@/styles/Home.module.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Carrito = () => {
  const router = useRouter();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carrito = Cookies.get('carrito') ? JSON.parse(Cookies.get('carrito')) : [];
    setCarrito(carrito);
  }, []);

  const handleEliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    Cookies.set('carrito', JSON.stringify(nuevoCarrito));
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:2023/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carrito }),
      });

      const data = await response.json();
      if (data && data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Layout className={styles.app}>
      <h1 className={styles.tituloPaginas}>Carrito</h1>
      <div className={`${styles.contenedorSeccionCarrito} ${carrito.length === 0 ? styles.contenedorSeccionCarritoVacio : ''}`}>
        <div className={`${styles.contenedorCarrito} ${carrito.length === 0 ? styles.contenedorCarritoVacio : ''}`}>
          <h3>Productos en el carrito</h3>
          {carrito.length === 0 ? (
            <p className={styles.mensajeCarritoVacio}>No hay productos en el carrito.</p>
          ) : (
            carrito.map((producto, index) => (
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
                  <p className={styles.nombreProductoCarrito}>{producto.nombre}</p>
                  <p className={styles.categoriaProductoCarrito}>{producto.categoria}</p>
                  <p>{producto.precio}</p>
                </div>
                <button
                  className={styles.botonEliminar}
                  onClick={() => handleEliminarProducto(index)}
                >
                  <Image src="/eliminar.png" alt="Eliminar" width={20} height={20} />
                </button>
              </div>
            ))
          )}
        </div>
        {carrito.length > 0 && (
          <button className={styles.botonIrCheckout} onClick={handleCheckout}>Proceder al checkout</button>
        )}
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Carrito;

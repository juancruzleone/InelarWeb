import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/layout';
import Footer from '@/components/Footer';
import styles from '@/styles/Home.module.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const Carrito = () => {
  const router = useRouter();
  const [carrito, setCarrito] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const carrito = Cookies.get('carrito') ? JSON.parse(Cookies.get('carrito')) : [];
    setCarrito(carrito);

    const userData = localStorage.getItem('userData');
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleEliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].unidades > 1) {
      nuevoCarrito[index].unidades -= 1;
    } else {
      nuevoCarrito.splice(index, 1);
    }
    setCarrito(nuevoCarrito);
    Cookies.set('carrito', JSON.stringify(nuevoCarrito));
  };

  const handleIncrementarUnidades = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].unidades += 1;
    setCarrito(nuevoCarrito);
    Cookies.set('carrito', JSON.stringify(nuevoCarrito));
  };

  const handleVaciarCarrito = () => {
    setCarrito([]);
    Cookies.set('carrito', JSON.stringify([]));
  };

  const handleCheckout = async () => {
    if (!userData) {
      setModalIsOpen(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:2023/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carrito,
          estado: 'nuevo',
          userId: userData.cuenta._id, // Utilizas el ID del usuario desde el userData
        }),
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
                  <div>
                    <p className={styles.nombreProductoCarrito}>{producto.nombre}</p>
                    <p className={styles.categoriaProductoCarrito}>{producto.categoria}</p>
                    <p>{producto.precio}</p>
                  </div>
                  <div className={styles.unidadesProductoCarrito}>
                    <p><span>Unidades:</span>{producto.unidades}</p>
                  </div>
                </div>
                <button
                  className={styles.botonSumar}
                  onClick={() => handleIncrementarUnidades(index)}
                >
                  <Image src="/suma.svg" alt="Sumar unidades" width={20} height={20} />
                </button>
                <button
                  className={styles.botonEliminar}
                  onClick={() => handleEliminarProducto(index)}
                >
                  <Image src="/eliminar.svg" alt="Eliminar unidades" width={20} height={20} />
                </button>
              </div>
            ))
          )}
        </div>
        {carrito.length > 0 ? (
          <button
            className={styles.botonVaciar}
            onClick={handleVaciarCarrito}
          >
            Vaciar carrito
          </button>
        ) : (
          <></>
        )}
        {userData ? (
          <button
            className={styles.botonIrCheckout}
            onClick={handleCheckout}
          >
            Proceder al checkout
          </button>
        ) : (
          <button
            className={styles.botonIrCheckout}
            onClick={() => setModalIsOpen(true)}
          >
            Proceder al checkout
          </button>
        )}
      </div>
      <Footer></Footer>
      <Modal
        isOpen={modalIsOpen}
        className={styles.ModalCheckout}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Debes logearte para proceder al checkout"
      >
        <h2 className={styles.tituloModalCheckout}>Tenés que logearte para ir al checkout</h2>
      </Modal>
    </Layout>
  );
};

export default Carrito;
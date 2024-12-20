import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Footer from '@/components/Footer';
import ProductDetail from '@/components/detalleProducto/components/DetalleProducto.jsx';
import ProductosRelacionados from '@/components/detalleProducto/components/ProductosRelacionados.jsx';
import Cargando from '@/components/detalleProducto/components/Cargando.jsx';
import ModalConfirmacion from '@/components/detalleProducto/components/ModalConfirmacion.jsx'; 
import useProductoDetalle from '@/components/detalleProducto/hooks/useProductoDetalle.jsx';
import { addToCart } from '@/components/detalleProducto/utils/CarritoUtils.jsx';
import { fetchProductoData } from '@/components/detalleProducto/utils/FetchProductoData.jsx'; 
import styles from '@/styles/DetalleProducto.module.css';
import { useTheme } from '@/components/ThemeProvider'

const DetalleProducto = ({ initialProducto, initialProductosRelacionados }) => {
  const router = useRouter();
  const { id } = router.query;
  const { producto, productosRelacionados, loading } = useProductoDetalle(id, initialProducto, initialProductosRelacionados);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { theme } = useTheme()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.cuenta && userData.cuenta.role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleAgregarAlCarrito = (cantidad) => {
    addToCart(id, producto, cantidad);
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 3000);
  };

  const handleVerMas = (productoId) => {
    router.push(`/detalle/${productoId}`).then(() => {
      window.location.reload();
    });
  };

  if (loading) {
    return (
      <Layout className={styles.app}>
        <Cargando />
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout className={styles.app} data-theme={theme}>
      <ProductDetail producto={producto} handleAgregarAlCarrito={handleAgregarAlCarrito} isAdmin={isAdmin} />
      <div className={styles.contenedorDescripcionProducto}>
        <h2>Descripción</h2>
        <p>{producto.description}</p>
      </div>
      <ProductosRelacionados productosRelacionados={productosRelacionados} handleVerMas={handleVerMas} />
      <Footer />
      <ModalConfirmacion 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        mensaje="Producto agregado al carrito" 
      />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const data = await fetchProductoData(id);

  if (data.error || data.notFound) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialProducto: data.producto,
      initialProductosRelacionados: data.productosRelacionados,
    },
  };
}

export default DetalleProducto;
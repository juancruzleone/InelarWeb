import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Footer from '@/components/Footer';
import ProductDetail from '@/components/detalleProducto/components/DetalleProducto.jsx';
import RelatedProducts from '@/components/detalleProducto/components/ProductosRelacionados.jsx';
import Loading from '@/components/detalleProducto/components/Cargando.jsx';
import AddToCartModal from '@/components/detalleProducto/components/ModalAgregarAlCarrito.jsx';
import useProductDetail from '@/components/detalleProducto/hooks/useProductoDetalle.jsx';
import { addToCart } from '@/components/detalleProducto/utils/CarritoUtils.jsx';
import { fetchProductoData } from '@/components/detalleProducto/utils/FetchProductoData.jsx'; 
import styles from '@/styles/Home.module.css';

const DetalleProducto = ({ initialProducto, initialProductosRelacionados }) => {
  const router = useRouter();
  const { id } = router.query;
  const { producto, productosRelacionados, loading } = useProductDetail(id, initialProducto, initialProductosRelacionados);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAgregarAlCarrito = () => {
    addToCart(id, producto);
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
        <Loading />
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout className={styles.app}>
      <ProductDetail producto={producto} handleAgregarAlCarrito={handleAgregarAlCarrito} />
      <div className={styles.contenedorDescripcionProducto}>
        <h2>Descripción</h2>
        <p>{producto.description}</p>
      </div>
      <RelatedProducts productosRelacionados={productosRelacionados} handleVerMas={handleVerMas} />
      <Footer />
      <AddToCartModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
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

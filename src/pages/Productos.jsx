import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import Categorias from "@/components/productos/components/Categorias";
import ListaProductos from "@/components/productos/components/ListaProductos";
import useProductos from "@/components/productos/hooks/useProductos";
import styles from "@/styles/Productos.module.css";

const Productos = () => {
  const {
    products,
    loading,
    selectedCategory,
    changeCategory,
  } = useProductos();

  return (
    <Layout>
      <Head>
        <title>Productos | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.contenedorPagina}>
        <h1 className={styles.tituloPaginas}>Productos</h1>
        <div className={styles.posicionSeccionProductos}>
          <Categorias 
            changeCategory={changeCategory} 
            categoriaSeleccionada={selectedCategory} 
          />
          <ListaProductos productos={products} loading={loading} />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Productos;

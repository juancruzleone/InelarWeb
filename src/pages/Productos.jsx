import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import ProductosCategorias from "@/components/productos/components/ProductCategorys";
import ProductosLista from "@/components/productos/components/ProductList";
import useProductosState from "@/components/productos/components/ProductState";
import styles from "@/styles/Home.module.css";

const Productos = () => {
  const {
    productos,
    loading,
    categoriaSeleccionada,
    changeCategory,
  } = useProductosState();

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
          <ProductosCategorias 
            changeCategory={changeCategory} 
            categoriaSeleccionada={categoriaSeleccionada} 
          />
          <ProductosLista productos={productos} loading={loading} />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Productos;

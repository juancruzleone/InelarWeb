import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import ProductosCategorias from "@/components/productos/components/Categorias";
import ListaProductos from "@/components/productos/components/ListaProductos";
import useProductos from "@/components/productos/hooks/useProductos";
import styles from "@/styles/Home.module.css";

const Productos = () => {
  const {
    productos,
    loading,
    categoriaSeleccionada,
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
          <ProductosCategorias 
            changeCategory={changeCategory} 
            categoriaSeleccionada={categoriaSeleccionada} 
          />
          <ListaProductos productos={productos} loading={loading} />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Productos;

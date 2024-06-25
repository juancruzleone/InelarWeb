import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Realiza la solicitud al backend cuando el componente se monta
    const obtenerProductos = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:2023/api/productos");
        const data = await response.json();

        // Filtrar productos según la categoría seleccionada
        const productosFiltrados = categoriaSeleccionada
          ? data.filter((producto) => producto.categoria === categoriaSeleccionada)
          : data;

        setProductos(productosFiltrados);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [categoriaSeleccionada]); // Se ejecuta cuando cambia la categoría seleccionada

  const cambiaCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  return (
    <Layout>
      <div className={styles.contenedorPagina}>
        <h1 className={styles.tituloPaginas}>Productos</h1>
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorCategoriasProductos} id={styles.contenedorCategoriaProductos}>
            {/* Aplica la clase condicional aquí */}
            <a
              href="#"
              onClick={() => cambiaCategoria("detección")}
              className={categoriaSeleccionada === "detección" ? styles.categoriaSeleccionadaProducto : ""}
            >
              Detección
            </a>
            {/* Aplica la clase condicional aquí */}
            <a
              href="#"
              onClick={() => cambiaCategoria("extinción")}
              className={categoriaSeleccionada === "extinción" ? styles.categoriaSeleccionadaProducto : ""}
            >
              Extinción
            </a>
          </div>
          <div className={styles.contenedorProductos}>
            {loading ? (
              <p>Cargando productos...</p>
            ) : (
              productos.map((producto, index) => (
                <div key={index} className={styles.tarjetaProducto}>
                  <Image
                    src={producto.imagen}
                    alt={producto.name}
                    width={120}
                    height={120}
                    className={styles.imagenProducto}
                  />
                  <h3>{producto.name}</h3>
                  <p>${producto.price}</p>
                  <Link href={`/detalle/${producto._id}`} className={styles.botonVerMas}>
                    Ver más
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Productos;

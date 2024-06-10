import React, { useState, useEffect } from "react";
import Layout from "@/components/layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const ListaServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    // Realiza la solicitud al backend cuando el componente se monta
    const obtenerServicios = async () => {
      try {
        const response = await fetch("http://localhost:2023/api/servicios");
        const data = await response.json();

        setServicios(data);

        // Obtener las categorías únicas de los servicios
        const categoriasUnicas = Array.from(
          new Set(data.map((servicio) => servicio.category || "Sin Categoría"))
        );
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      }
    };

    obtenerServicios();
  }, []); // Se ejecuta solo cuando el componente se monta

  useEffect(() => {
    // Filtrar los servicios según la categoría seleccionada
    if (categoriaSeleccionada === null) {
      setServiciosFiltrados(servicios);
    } else {
      const serviciosFiltrados = servicios.filter(
        (servicio) => servicio.category === categoriaSeleccionada
      );
      setServiciosFiltrados(serviciosFiltrados);
    }
  }, [categoriaSeleccionada, servicios]);

  const handleClickCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const capitalizarPrimeraLetra = (cadena) => {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
  };

  return (
    <>
      <h1 className={styles.tituloPaginasPanel}>Servicios</h1>
      <div className={styles.posicionSeccionProductos}>
        <div className={styles.contenedorCategorias}>
          {/* Lista de todas las categorías como contenedores */}
          {categorias.map((categoria, index) => (
            <div
              key={index}
              className={`${styles.contenedorCategoria} ${
                categoria === categoriaSeleccionada
                  ? styles.categoriaSeleccionada
                  : ""
              }`}
              onClick={() => handleClickCategoria(categoria)}
            >
              <p>{capitalizarPrimeraLetra(categoria)}</p>
            </div>
          ))}
        </div>

        {/* Lista de servicios filtrada por categoría */}
        <div className={styles.contenedorServicios}>
          {serviciosFiltrados.map((servicio, index) => (
            <div key={index} className={styles.tarjetaProductoPanel}>
              <h3>Cliente: {servicio.nombre}</h3>
              <div className={styles.contenidoTarjetaProductoPanel}>
                <p><span>Email:</span>{servicio.email}</p>
                <p><span>Teléfono:</span>{servicio.telefono}</p>
                <p><span>Dirección:</span>{servicio.direccion}</p>
                <p><span>Dispositivo:</span>{servicio.dispositivo}</p>
                <p><span>Cantidad:</span>{servicio.cantidad}</p>
                <p><span>Fecha:</span>{servicio.fecha}</p>
                <p><span>Categoría:</span>{servicio.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListaServicios;

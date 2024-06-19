import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import PanelNav from "@/components/navpanel";
import ListaProductos from "@/components/ListaProductos.jsx";
import ListaClientes from "@/components/ListaClientes.jsx";
import ListaMensajes from "@/components/ListaMensajes.jsx";
import ListaServicios from "@/components/ListaServicios.jsx";
import styles from "@/styles/Home.module.css";

const PanelAdmin = () => {
  const [solapaActiva, setSolapaActiva] = useState("productos"); // Inicializa con la solapa de productos activa
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario tiene el rol de administrador en localStorage
    const userData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userData")) : null;

    if (!userData || !userData.cuenta || userData.cuenta.role !== "admin") {
      // Si no hay datos de usuario o el usuario no es admin, redirigir al login
      router.push("/login");
    } else {
      // Si el usuario es admin, permitir la carga del panel
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null; // O puedes devolver un componente de cargando
  }

  const handleSolapaClick = (solapa) => {
    setSolapaActiva(solapa);
  };

  return (
    <Layout className={styles.app}>
      <h1 className={styles.tituloPanel}>Panel admin</h1>
      <div className={styles.contenedorPanelAdmin}>
        <div className={styles.posicionMenuPanel}>
          <PanelNav onSolapaClick={handleSolapaClick} solapaActiva={solapaActiva} />
        </div>
        <div className={styles.contenedorContenidoPanel}>
          <div className={styles.contenidoPanel}>
            {/* Renderiza el contenido según la solapa activa */}
            {solapaActiva === "productos" && <ListaProductos />}
            {solapaActiva === "clientes" && <ListaClientes />}
            {solapaActiva === "servicios" && <ListaServicios />}
            {solapaActiva === "mensajes" && <ListaMensajes />}
            {/* Añade más lógica para otras solapas si es necesario */}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default PanelAdmin;

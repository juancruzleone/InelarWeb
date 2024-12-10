import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import PanelNav from "@/components/PanelNav";
import ListaProductos from "@/components/ListaProductos.jsx";
import ListaClientes from "@/components/ListaClientes.jsx";
import ListaMensajes from "@/components/ListaMensajes.jsx";
import ListaServicios from "@/components/ListaServicios.jsx";
import ListaInstalaciones from "@/components/ListaInstalaciones.jsx"; 
import ListaUsuarios from "@/components/ListaUsuarios.jsx"; 
import ListaOrdenes from "@/components/ListaOrdenes.jsx";
import styles from "@/styles/PanelAdmin.module.css";
import { useTheme } from '@/components/ThemeProvider'

const PanelAdmin = () => {
  const [solapaActiva, setSolapaActiva] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { theme } = useTheme()

  useEffect(() => {
    const userData = typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData"))
      : null;

    if (!userData || !userData.cuenta || userData.cuenta.role !== "admin") {
      router.push("/login");
    } else {
      const storedSolapa = localStorage.getItem("solapaActiva");
      if (storedSolapa) {
        setSolapaActiva(storedSolapa);
      } else {
        setSolapaActiva("productos");
      }
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (solapaActiva !== null) {
      localStorage.setItem("solapaActiva", solapaActiva);
    }
  }, [solapaActiva]);

  if (isLoading || solapaActiva === null) {
    return null;
  }

  const handleSolapaClick = (solapa) => {
    setSolapaActiva(solapa);
  };

  return (
    <Layout className={styles.app} data-theme={theme}>
      <Head>
        <title>Panel admin | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloPanel}>Panel admin</h1>
      <div className={styles.contenedorPanelAdmin}>
        <div className={styles.posicionMenuPanel}>
          <PanelNav
            onSolapaClick={handleSolapaClick}
            solapaActiva={solapaActiva}
          />
        </div>
        <div className={styles.contenedorContenidoPanel}>
          <div className={styles.contenidoPanel}>
            {solapaActiva === "productos" && <ListaProductos />}
            {solapaActiva === "pedidos" && <ListaOrdenes />}
            {solapaActiva === "clientes" && <ListaClientes />}
            {solapaActiva === "servicios" && <ListaServicios />}
            {solapaActiva === "mensajes" && <ListaMensajes />}
            {solapaActiva === "instalaciones" && <ListaInstalaciones />} 
            {solapaActiva === "usuarios" && <ListaUsuarios />} 
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default PanelAdmin;


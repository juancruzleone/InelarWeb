import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout";
import Footer from "@/components/Footer";
import Carrousel from "@/components/Carrousel";
import PanelNav from "@/components/navpanel";
import ListaProductos from "@/components/ListaProductos.jsx"; // Importa un componente ficticio que mostrará la lista de productos
import ListaClientes from "@/components/ListaClientes.jsx";
import ListaMensajes from '@/components/ListaMensajes.jsx'
import ListaServicios from '@/components/ListaServicios.jsx'
import styles from "@/styles/Home.module.css";

const PanelAdmin = () => {
  const [solapaActiva, setSolapaActiva] = useState("productos"); // Inicializa con la solapa de productos activa

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
      <Footer></Footer>
    </Layout>
  );
};

export default PanelAdmin;

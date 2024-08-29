import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Servicios = () => {
  return (
    <Layout>
      <Head>
        <title>Servicios | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloPaginas}>Servicios</h1>
      <h2 className={styles.subtituloServicio}>
        Los servicios se brindan en toda la Argentina
      </h2>
      <div className={styles.contenedorCardServicios}>
        <div className={styles.cardServicios}>
          <Link href="/instalaciones" className={styles.cardLink}>
            <Image
              src="/instalaciones.svg"
              alt="Edificio en mantenimiento"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
            <h3 className={styles.tituloCardServicio}>Instalaciones</h3>
            <p className={styles.descripcionServicio}></p>
            <span className={styles.botonCardServicio}>Ver más</span>
          </Link>
        </div>
        <div className={styles.cardServicios}>
          <Link href="/mantenimientos" className={styles.cardLink}>
            <Image
              src="/mantenimiento.svg"
              alt="Herramientas"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
            <h3 className={styles.tituloCardServicio}>Mantenimientos</h3>
            <p className={styles.descripcionServicio}></p>
            <span className={styles.botonCardServicio}>Ver más</span>
          </Link>
        </div>
        <div className={styles.cardServicios}>
          <Link href="/servicio-tecnico" className={styles.cardLink}>
            <Image
              src="/servicio-tecnico.svg"
              alt="Técnico con llave inglesa"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
            <h3 className={styles.tituloCardServicio}>Servicio técnico</h3>
            <p className={styles.descripcionServicio}></p>
            <span className={styles.botonCardServicio}>Ver más</span>
          </Link>
        </div>
        <div className={styles.cardServicios}>
          <Link href="/provisiones" className={styles.cardLink}>
            <Image
              src="/provisiones.svg"
              alt="Camión de reparto"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
            <h3 className={styles.tituloCardServicio}>Provisiones</h3>
            <p className={styles.descripcionServicio}></p>
            <span className={styles.botonCardServicio}>Ver más</span>
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Servicios;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Carrousel from "@/components/Carrousel";
import styles from "@/styles/Home.module.css";

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>Inicio | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.tituloHome}>
        <h1>
          <Image
            src="/logo-elegidos.svg"
            alt="Logo inelar"
            className={styles.fotoServicio}
            width={300}
            height={300}
          />
        </h1>
        <h2>solución en prevención y combate de incendios</h2>
        <div className={styles.contenedorFlecha}>
          <a href="#nuestraApp">
            <Image
              src="/flecha-abajo.svg"
              alt="flecha hacia abajo"
              className={styles.flechaAbajo}
              width={70}
              height={70}
            />
          </a>
        </div>
      </div>

      <div className={styles.contenedorNuestraApp} id="nuestraApp">
        <div className={styles.circulo}>
          <div className={styles.celularApp}>
            <Image
              src="/pantallacarga.svg"
              alt="mockup app mobile inelar"
              className={styles.celularImagen}
              width={400}
              height={500}
            />
          </div>
        </div>
        <div className={styles.contenedorTextoNuestraApp}>
          <h2 className={styles.subtituloApp}>Descubre Nuestra App</h2>
          <p>
            ¡Bienvenido a la puerta de entrada a la innovación tecnológica! En
            INELAR, hemos creado una aplicación revolucionaria pensando en ti y
            en la simplicidad de mantener tus dispositivos siempre en óptimas
            condiciones.
          </p>
          <br />
          <p>
            Nuestra App es tu solución para un mantenimiento rápido y efectivo.
            Imagina tener el control total de tus dispositivos con tan solo un
            escaneo de código QR. Es fácil, rápido y está diseñado pensando en
            los usuarios.
          </p>
        </div>
      </div>

      <div className={styles.contenedorServicios}>
        <h2 className={styles.subtituloServicios}>Servicios</h2>
        <div className={styles.posicionServicios}>
          <div className={styles.cajaServicios}>
            <Link href="/instalaciones" className={styles.servicioLink}>
              <h3 className={styles.nombreServicios}>Instalaciones</h3>
              <Image
                src="/instalaciones.svg"
                alt="Edificio en mantenimiento"
                className={styles.iconoServicios}
                width={140}
                height={140}
              />
            </Link>
          </div>
          <div className={styles.cajaServicios}>
            <Link href="/mantenimientos" className={styles.servicioLink}>
              <h3 className={styles.nombreServicios}>Mantenimientos</h3>
              <Image
                src="/mantenimiento.svg"
                alt="Herramientas"
                className={styles.iconoServicios}
                width={140}
                height={140}
              />
            </Link>
          </div>
          <div className={styles.cajaServicios}>
            <Link href="/serviciotecnico" className={styles.servicioLink}>
              <h3 className={styles.nombreServicios}>Servicio técnico</h3>
              <Image
                src="/servicio-tecnico.svg"
                alt="Técnico con llave inglesa"
                className={styles.iconoServicios}
                width={140}
                height={140}
              />
            </Link>
          </div>
          <div className={styles.cajaServicios}>
            <Link href="/provisiones" className={styles.servicioLink}>
              <h3 className={styles.nombreServicios}>Provisiones</h3>
              <Image
                src="/provisiones.svg"
                alt="Camión de reparto"
                className={styles.iconoServicios}
                width={140}
                height={140}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.contenedorObras}>
        <h2 className={styles.subtitulos}>Obras</h2>
        <div className={styles.contenedorCarrousel}>
          <Carrousel />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Index;

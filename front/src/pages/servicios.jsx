import React from "react";
import Link from 'next/link';
import Image from "next/image";
import Layout from "@/components/layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Servicios = () => {
  return (
    <Layout>
      <h1 className={styles.tituloPaginas}>Servicios</h1>
      {/*No se si va este texto (h2)*/}
      <h2 className={styles.subtituloServicio}>
        Los servicios se brindan en toda la Argentina
      </h2>
      <div className={styles.contenedorCardServicios}>
        <div className={styles.cardServicios}>
          <Link href="/instalaciones">
            <Image
              src="/instalaciones.svg"
              alt="icono instalaciones"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
          </Link>
          <h3 className={styles.tituloCardServicio}>Instalaciones</h3>
          <p className={styles.descripciónServicio}></p>
          <Link href="/instalaciones" className={styles.botonCardServicio}>
            Ver más
          </Link>
        </div>
        <div className={styles.cardServicios}>
          <Link href='/mantenimientos'>
            <Image
              src="/mantenimiento.svg"
              alt="icono mantenimiento"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
          </Link>  
          <h3 className={styles.tituloCardServicio}>Mantenimientos</h3>
          <p className={styles.descripciónServicio}></p>
          <Link href="/mantenimientos" className={styles.botonCardServicio}>
            Ver más
          </Link>
        </div>
        <div className={styles.cardServicios}>
          <Link href="/serviciotecnico">
            <Image
              src="/servicio-tecnico.svg"
              alt="icono servicio tecnico"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
          </Link>
          <h3 className={styles.tituloCardServicio}>Servicio técnico</h3>
          <p className={styles.descripciónServicio}></p>
          <Link href="/serviciotecnico" className={styles.botonCardServicio}>
            Ver más
          </Link>
        </div>
        <div className={styles.cardServicios}>
          <Link href="/provisiones">
            <Image
              src="/provisiones.svg"
              alt="icono provisiones"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
          </Link>
          <h3 className={styles.tituloCardServicio}>Provisiones</h3>
          <p className={styles.descripciónServicio}></p>
          <Link href="/provisiones" className={styles.botonCardServicio}>
            Ver más
          </Link>
        </div>
      </div>
      <Footer></Footer>
      {/* Ver si es mejor cargar todo el contenido en array y despues recorrerlo */}
    </Layout>
  );
};

export default Servicios;

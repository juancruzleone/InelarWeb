import React from "react";
import Image from "next/image";
import Layout from "@/components/layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const certificaciones = () => {
  return (
    <Layout>
      <h1 className={styles.tituloPaginas}>Certificaciones</h1>
      <p className={styles.subtituloCertificaciones}>
        Licencias nacionales e internacionales
      </p>
      <div className={styles.posicionContenedorCertificaciones}>
        <div className={styles.contenedorCertificaciones}>
          <Image
            src="/logo-iram.svg"
            alt="Logo certificación iram"
            width={120}
            height={120}
          />
        </div>
        <div className={styles.contenedorCertificaciones}>
          <Image
            src="/logo-nfpa.svg"
            alt="Logo certificación nfpa"
            width={120}
            height={120}
          />
        </div>
        <div className={styles.contenedorCertificaciones}>
          <Image
            src="/logo 3.svg"
            alt="Logo certificación cemera"
            className={styles.celularImagen}
            width={120}
            height={120}
          />
        </div>
      </div>

      <Footer></Footer>
    </Layout>
  );
};

export default certificaciones;

import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import styles from "@/styles/Certificaciones.module.css";

const Certificaciones = () => {
  return (
    <Layout>
      <Head>
        <title>Certificaciones | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloPaginas}>Certificaciones</h1>
      <h2 className={styles.subtituloCertificaciones}>
        Licencias nacionales e internacionales
      </h2>
      <div className={styles.posicionContenedorCertificaciones}>
        <div className={styles.contenedorCertificaciones}>
          <Image
            src="/logo-iram2.svg"
            alt="Logo certificación IRAM"
            width={120}
            height={100}
          />
        </div>
        <div className={styles.contenedorCertificaciones}>
          <Image
            src="/logo-nfpa2.svg"
            alt="Logo certificación NFPA"
            width={120}
            height={100}
          />
        </div>
        <div className={styles.contenedorCertificaciones}>
          <Image
            src="/logo-cemera.svg"
            alt="Logo certificación CEMERA"
            width={120}
            height={100}
          />
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Certificaciones;

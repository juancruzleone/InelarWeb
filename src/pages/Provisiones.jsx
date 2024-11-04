import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import styles from "@/styles/DetalleServicio.module.css";
import { useTheme } from '@/components/ThemeProvider'

const Provisiones = () => {
  const { theme } = useTheme()

  return (
    <Layout>
      <Head>
        <title>Provisiones | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div data-theme={theme}>
        <h1 className={styles.tituloServicio}>Provisiones</h1>
        <div className={styles.contenedorPosicionamientoContenidoServicio}>
          <div className={styles.contenedorTextoServicio}>
            <p className={styles.textoServicios}>En <span>Inelar</span>, sabemos que el éxito de cualquier proyecto depende de los recursos adecuados. <span>Ofrecemos provisiones tecnológicas de primera calidad</span> para garantizar que tengas todo lo que necesitas para llevar a cabo tu proyecto con éxito.</p>
            <p className={styles.textoServicios}>Ya sea en hardware o software, en Inelar contamos con una amplia gama de recursos y herramientas para tus proyectos tecnológicos. Desde soluciones personalizadas de software hasta hardware de última generación, trabajamos con nuestros clientes para entender sus necesidades y proporcionar soluciones que se ajusten exactamente a lo que necesitan.</p>
            <p className={styles.textoServicios}>Accede a nuestro amplio catálogo de provisiones tecnológicas y cuéntanos qué necesitas. <span>Nuestro equipo de expertos te ayudará a elegir la mejor opción según tus necesidades y te proporcionará todas las herramientas que necesitas para llevar a cabo tu proyecto.</span></p>
          </div>
          <Image
            src="/servicio-provisiones-.webp"
            alt="Imagen servicio provisiones"
            className={styles.fotoServicio}
            width={300}
            height={300}
          />     
        </div>
        <Link href="/solicitar-provision" className={styles.botonServicio}>Solicitar provisiones</Link>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Provisiones;
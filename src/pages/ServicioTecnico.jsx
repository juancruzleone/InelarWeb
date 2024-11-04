import Link from "next/link";
import Image from "next/image";
import Head from "next/head"
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import styles from "@/styles/DetalleServicio.module.css";
import { useTheme } from '@/components/ThemeProvider'

const ServicioTecnico = () => {
  const { theme } = useTheme()

  return (
    <Layout>
      <Head>
        <title>Servicio técnico | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div data-theme={theme}>
        <h1 className={styles.tituloServicio}>Servicio técnico</h1>
        <div className={styles.contenedorPosicionamientoContenidoServicio}>
          <div className={styles.contenedorTextoServicio}>
            <p className={styles.textoServicios}>En <span>Inelar</span>, estamos comprometidos a brindar un servicio técnico excepcional. <span>Nuestro equipo de soporte está disponible para atender tus necesidades tecnológicas en cualquier momento que surja un problema.</span> Ya sea un pequeño contratiempo o una pregunta importante, estamos aquí para ayudarte.</p>
            <p className={styles.textoServicios}>Nos enorgullece ofrecer un servicio de atención al cliente personalizado y profesional. Nuestros técnicos están altamente capacitados y comprometidos a ofrecer soluciones prácticas y efectivas a cualquier problema técnico que puedas tener.</p>
            <p className={styles.textoServicios}>Además, ponemos a tu disposición una línea telefónica y una plataforma de asistencia en línea para garantizar una respuesta rápida y efectiva ante cualquier inconveniente técnico. <span>Nuestro objetivo es siempre mantener tus operaciones en línea y sin contratiempos.</span></p>
          </div>
          <Image
            src="/servicio-tecnico-servicio.webp"
            alt="Imagen servicio técnico"
            className={styles.fotoServicio}
            width={300}
            height={300}
          />     
        </div>
        <Link href="/solicitar-servicio-tecnico" className={styles.botonServicio}>Solicitar servicio técnico</Link>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default ServicioTecnico;
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import styles from "@/styles/Servicios.module.css";
import { useTheme } from '@/components/ThemeProvider'

const Servicios = () => {
  const { theme } = useTheme()

  useEffect(() => {
    const cardServicios = document.querySelectorAll(`.${styles.cardServicios}`);
    
    cardServicios.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Servicios | Inelar</title>
        <meta name="description" content="Servicios ofrecidos por Inelar" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.container} data-theme={theme}>
        <h1 className={styles.tituloPaginas}>Servicios</h1>
        <h2 className={styles.subtituloServicio}>
          Los servicios se brindan en toda la Argentina
        </h2>
        <div className={styles.contenedorCardServicios}>
          <div className={styles.cardServicios}>
            <Link href="/instalaciones" className={styles.cardLink}>
              <Image
                src="/instalaciones2.svg"
                alt="Edificio en mantenimiento"
                className={styles.iconoServiciosCard}
                width={140}
                height={140}
              />
              <h3 className={styles.tituloCardServicio}>Instalaciones</h3>
              <span className={styles.botonCardServicio}>Ver más</span>
            </Link>
          </div>
          <div className={styles.cardServicios}>
            <Link href="/mantenimientos" className={styles.cardLink}>
              <Image
                src="/mantenimiento2.svg"
                alt="Herramientas"
                className={styles.iconoServiciosCard}
                width={140}
                height={140}
              />
              <h3 className={styles.tituloCardServicio}>Mantenimientos</h3>
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
              <span className={styles.botonCardServicio}>Ver más</span>
            </Link>
          </div>
          <div className={styles.cardServicios}>
            <Link href="/provisiones" className={styles.cardLink}>
              <Image
                src="/provisiones2.svg"
                alt="Camión de reparto"
                className={styles.iconoServiciosCard}
                width={140}
                height={140}
              />
              <h3 className={styles.tituloCardServicio}>Provisiones</h3>
              <span className={styles.botonCardServicio}>Ver más</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Servicios;
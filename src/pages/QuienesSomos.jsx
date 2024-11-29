import Head from "next/head"
import Image from "next/image"
import Layout from "@/components/layout/index"
import Footer from "@/components/Footer"
import styles from "@/styles/QuienesSomos.module.css"
import { useTheme } from '@/components/ThemeProvider'
import CountUp from "react-countup"

export default function QuienesSomos() {
  const { theme } = useTheme()
  
  return (
    <Layout>
      <Head>
        <title>Quiénes somos | Inelar</title>
        <meta name="description" content="Conoce más sobre Inelar, nuestra historia y nuestro compromiso" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.container} data-theme={theme}>
        <div className={styles.contenedorSecciones}>
          <div className={styles.contenedorPortada}>
            <div className={styles.imagenQuienesSomos}>
              <Image
                src="/inelar2.jpg"
                alt="Fundadores de Inelar"
                id={styles.fotoQuienesSomos}
                width={300}
                height={300}
              />
            </div>
            <section id={styles.contenedoresQuienesSomos}>
              <h1 className={styles.tituloPaginas} id={styles.quienesSomos}>Quiénes somos</h1>
              <h2>Nuestra empresa</h2>
              <p>
                <span>Una empresa líder en el rubro de sistemas automatizados de detección y extinción de incendios</span>. Con obras públicas y privadas a lo largo de Argentina. Contamos con una trayectoria de +50 años.
              </p>
              <p>
                Las obras realizas abarcan a las compañias e instituciones más importantes en todos los rubros: Comunicación, energía, transporte, entidades financieras, y manufactureras 
              </p>
            </section>
          </div>
          <div className={styles.contenedorContadores}>
            <div className={styles.contador}>
              <span className={styles.plusSign}>+</span>
              <CountUp start={0} end={50} duration={3} />
              <p>Años de experiencia</p>
            </div>
            <div className={styles.contador}>
              <span className={styles.plusSign}>+</span>
              <CountUp start={0} end={200} duration={3} />
              <p>Obras realizadas</p>
            </div>
            <div className={styles.contador}>
              <span className={styles.plusSign}>+</span>
              <CountUp start={0} end={500} duration={3} />
              <p>Clientes satisfechos</p>
            </div>
          </div>

          <h2 className={styles.subtitulo}>Nuestros Valores</h2> 
          <div className={styles.contenedorGrid}>
            <section className={styles.contenedoresQuienesSomos}>
              <h2>Investigación y Desarrollo</h2>
              <p>
                <span>Es una empresa dedicada a la investigación y el desarrollo de nuevos productos</span>. A través del entrenamiento de su personal profesional, tanto en el país como en el extranjero, Inelar incorpora en forma continua los avances tecnológicos que permiten el mejoramiento y abaratamiento de los sistemas automáticos de control.
              </p>
            </section>
            <section className={styles.contenedoresQuienesSomos}>
              <h2>Compromiso con la Calidad</h2>
              <p>
                <span>Trabajamos bajo la consigna de que todo elemento diseñado para la protección de la vida humana debe ser confiable y funcionar correctamente cuando sea requerido su uso.</span> Nos encontramos empeñados en aumentar nuestra capacidad para producir con calidad. Parte de este programa de superación es la obtención de la calificación ISO 9002 que garantiza el reconocimiento internacional de nuestros productos.
              </p>
            </section>
            <section className={styles.contenedoresQuienesSomos}>
              <h2>Servicios Complementarios</h2>
              <p>
                <span>Complementamos nuestro trabajo con programas de entrenamiento para usuarios, y realizamos cursos de actualización para profesionales.</span> Entérese de las últimas Jornadas. Contamos además con un Departamento Técnico y mesa de ayuda para cualquier consulta referida a nuestros productos o a normas y requerimientos nacionales o internacionales de seguridad contra incendios.
              </p>
            </section>
            <section className={styles.contenedoresQuienesSomos}>
              <h2>Nuestra Misión</h2>
              <p><span>Protegemos lo más importante</span> utilizando los recursos más modernos de la ingeniería y la informática.</p>
            </section>
          </div>
          <h2 className={styles.subtitulo} id={styles.tituloCertificacion}>Certificaciones</h2> 
          <div className={styles.posicionContenedorCertificaciones}>
          <div className={styles.contenedorCertificaciones}>
            <Image
              src="/logo-iram2.svg"
              alt="Logo certificación IRAM"
              width={120}
              height={100}
              layout="responsive"
            />
          </div>
          <div className={styles.contenedorCertificaciones}>
            <Image
              src="/logo-nfpa2.svg"
              alt="Logo certificación NFPA"
              width={120}
              height={100}
              layout="responsive"
            />
          </div>
          <div className={styles.contenedorCertificaciones}>
            <Image
              src="/logo-cemera.svg"
              alt="Logo certificación CEMERA"
              width={120}
              height={100}
              layout="responsive"
            />
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import Carrousel from "@/components/Carrousel";
import styles from "@/styles/Home.module.css";
import { useTheme } from '@/components/ThemeProvider'

const Index = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const { theme } = useTheme()

  const questionsAnswers = [
    {
      question: "¿Qué es Inelar?",
      answer:
        "Inelar es una empresa de tecnología especializada en el desarrollo de software y soluciones digitales para empresas de diversos sectores.",
    },
    {
      question: "¿Cuál es la misión de Inelar?",
      answer:
        "Nuestra misión es proporcionar a las empresas herramientas tecnológicas innovadoras que les permitan mejorar su eficiencia y competitividad en el mercado.",
    },
    {
      question: "¿Qué tipos de servicios ofrece Inelar?",
      answer:
        "Inelar ofrece una amplia gama de servicios, que incluyen desarrollo de software a medida, consultoría tecnológica, diseño de aplicaciones móviles y web, y soluciones de comercio electrónico.",
    },
    {
      question: "¿Cómo puedo contactar a Inelar para obtener más información?",
      answer:
        "Puedes ponerte en contacto con nosotros a través de nuestro correo electrónico de contacto: info@inelar.com o llamando al número de teléfono +123-456-789.",
    },
    {
      question: "¿Cuáles son los servicios que ofrece Inelar en el ámbito de seguridad contra incendios?",
      answer:
        "Inelar es una empresa especializada en seguridad contra incendios. Ofrecemos una amplia gama de servicios que incluyen la instalación y mantenimiento de sistemas de detección de incendios, extintores, sistemas de rociadores, y capacitación en seguridad contra incendios. Nuestro objetivo es garantizar la seguridad y protección de tu negocio frente a posibles incendios.",
    },
    {
      question: "¿Inelar proporciona soporte técnico y mantenimiento continuo?",
      answer:
        "Sí, ofrecemos servicios de soporte técnico y mantenimiento continuo para garantizar que las soluciones tecnológicas sigan siendo efectivas y actualizadas a lo largo del tiempo.",
    },
  ];

  const handleClick = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  useEffect(() => {
    const toggleButtons = document.querySelectorAll(`.${styles.toggleButton}`);

    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const faqItem = button.parentElement;
        const answer = faqItem.querySelector(`.${styles.respuesta}`);

        faqItem.classList.toggle("active");
        answer.classList.toggle("show");
        button.textContent = answer.classList.contains("show") ? "-" : "+";

        if (answer.classList.contains("show")) {
          faqItem.style.height = faqItem.scrollHeight + "px";
        } else {
          faqItem.style.height = null;
        }
      });
    });
  }, []);

  useEffect(() => {
    const cajaServicios = document.querySelectorAll(`.${styles.cajaServicios}`);
    
    cajaServicios.forEach(box => {
      box.addEventListener('mousemove', e => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        box.style.setProperty('--mouse-x', `${x}px`);
        box.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }, []);

  return (
    <Layout data-theme={theme}>
      <Head>
        <title>Inicio | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.tituloHome}>
        <div className={styles.contenedorPortada}>
          <div className={styles.titleContainer}>
            <h1>
              <Image
                src={theme === 'light' ? "/logo-negro.svg" : "/logo-blanco.svg"}
                alt="Logo inelar"
                className={styles.iconoHome}
                width={300}
                height={300}
              />
            </h1>
            <h2>solución en prevención y combate de incendios</h2>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={theme === 'light' ? "/Cartas-negras.svg" : "/Cartas2.svg"}
              alt="Cartas"
              width={200}
              height={200}
            />
          </div>
        </div>
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
          <h2>Descubre nuestra app</h2>
          <p>
            ¡Bienvenido a la puerta de entrada a la innovación tecnológica! En
            <span>Inelar</span>, hemos creado una aplicación revolucionaria pensando en ti y
            en la simplicidad de mantener tus dispositivos siempre en óptimas
            condiciones.
          </p>
          <p id={styles.segundoParrafoNuestraApp}>
            Nuestra App es tu solución para un mantenimiento rápido y efectivo.
            <span>Imagina tener el control total de tus dispositivos con tan solo un
            escaneo de código QR.</span> Es fácil, rápido y está diseñado pensando en
            los usuarios.
          </p>
        </div>
      </div>
      <div className={styles.contenedorServicios}>
        <h2>Servicios</h2>
        <div className={styles.posicionServicios}>
          <div className={styles.cajaServicios}>
            <Link href="/instalaciones" className={styles.servicioLink}>
              <h3 className={styles.nombreServicios}>Instalaciones</h3>
              <Image
                src="/instalaciones2.svg"
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
                src="/mantenimiento2.svg"
                alt="Herramientas"
                className={styles.iconoServicios}
                width={140}
                height={140}
              />
            </Link>
          </div>
          <div className={styles.cajaServicios}>
            <Link href="/servicio-tecnico" className={styles.servicioLink}>
              <h3 className={styles.nombreServicios}>Servicio técnico</h3>
              <Image
                src="/servicio-tecnico2.svg"
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
                src="/provisiones2.svg"
                alt="Camión de reparto"
                className={styles.iconoServicios}
                width={140}
                height={140}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.contenedorPreguntasFrecuentesInicio}>
        <h2 className={styles.subtitulosHome}>Preguntas Frecuentes</h2>
        <div className={styles.posicionPreguntasFrecuentes}>
          {questionsAnswers.map((item, index) => (
            <div
              className={`${styles.contenedorPreguntaRespuesta} ${
                openQuestion === index ? styles.respuestaAbierta : ""
              }`}
              key={index}
              style={{
                marginBottom: openQuestion === index ? "20px" : "0",
                height: openQuestion === index ? "auto" : "60px",
              }}
            >
              <button
                className={styles.toggleButton}
                onClick={() => handleClick(index)}
              >
                {openQuestion === index ? "-" : "+"}
              </button>
              <h3 id={styles.titulosPreguntas}>{item.question}</h3>
              <div
                className={`${styles.respuesta} ${
                  openQuestion === index ? styles.respuestaVisible : ""
                } show`}
              >
                <p id={styles.respuestasPreguntas}>{item.answer}</p>
              </div>
            </div>
          ))}
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
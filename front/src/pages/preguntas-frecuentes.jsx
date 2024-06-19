import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const PreguntasFrecuentes = () => {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  const preguntasRespuestas = [
    {
      pregunta: "¿Qué es Inelar?",
      respuesta:
        "Inelar es una empresa de tecnología especializada en el desarrollo de software y soluciones digitales para empresas de diversos sectores.",
    },
    {
      pregunta: "¿Cuál es la misión de Inelar?",
      respuesta:
        "Nuestra misión es proporcionar a las empresas herramientas tecnológicas innovadoras que les permitan mejorar su eficiencia y competitividad en el mercado.",
    },
    {
      pregunta: "¿Qué tipos de servicios ofrece Inelar?",
      respuesta:
        "Inelar ofrece una amplia gama de servicios, que incluyen desarrollo de software a medida, consultoría tecnológica, diseño de aplicaciones móviles y web, y soluciones de comercio electrónico.",
    },
    {
      pregunta: "¿Cómo puedo contactar a Inelar para obtener más información?",
      respuesta:
        "Puedes ponerte en contacto con nosotros a través de nuestro correo electrónico de contacto: info@inelar.com o llamando al número de teléfono +123-456-789.",
    },
    {
      pregunta: "¿Cuáles son los servicios que ofrece Inelar en el ámbito de seguridad contra incendios?",
      respuesta:
        "Inelar es una empresa especializada en seguridad contra incendios. Ofrecemos una amplia gama de servicios que incluyen la instalación y mantenimiento de sistemas de detección de incendios, extintores, sistemas de rociadores, y capacitación en seguridad contra incendios. Nuestro objetivo es garantizar la seguridad y protección de tu negocio frente a posibles incendios.",
    },
    {
      pregunta: "¿Inelar proporciona soporte técnico y mantenimiento continuo?",
      respuesta:
        "Sí, ofrecemos servicios de soporte técnico y mantenimiento continuo para garantizar que las soluciones tecnológicas sigan siendo efectivas y actualizadas a lo largo del tiempo.",
    },
  ];

  const handleClick = (index) => {
    if (preguntaAbierta === index) {
      setPreguntaAbierta(null);
    } else {
      setPreguntaAbierta(index);
    }
  };

  useEffect(() => {
    const toggleButtons = document.querySelectorAll(`.${styles.toggleButton}`);

    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const preguntaFrecuente = button.parentElement;
        const respuesta = preguntaFrecuente.querySelector(
          `.${styles.respuesta}`
        );

        preguntaFrecuente.classList.toggle("active");
        respuesta.classList.toggle("show");
        button.textContent = respuesta.classList.contains("show") ? "-" : "+";

        if (respuesta.classList.contains("show")) {
          preguntaFrecuente.style.height =
            preguntaFrecuente.scrollHeight + "px";
        } else {
          preguntaFrecuente.style.height = null;
        }
      });
    });
  }, []);

  return (
    <Layout>
      <h1 className={styles.tituloPaginas}>Preguntas frecuentes</h1>
      <div className={styles.posicionPreguntasFrecuentes}>
        {preguntasRespuestas.map((item, index) => (
          <div
            className={`${styles.contenedorPreguntaRespuesta} ${
              preguntaAbierta === index ? styles.respuestaAbierta : ""
            }`}
            key={index}
            style={{
              marginBottom: preguntaAbierta === index ? "20px" : "0",
              height: preguntaAbierta === index ? "auto" : "60px",
            }}
          >
            <button
              className={styles.toggleButton}
              onClick={() => handleClick(index)}
            >
              {preguntaAbierta === index ? "-" : "+"}
            </button>
            <h2 id={styles.titulosPreguntas}>{item.pregunta}</h2>
            <div
              className={`${styles.respuesta} ${
                preguntaAbierta === index ? styles.respuestaVisible : ""
              } show`}
            >
              <p id={styles.respuestasPreguntas}>{item.respuesta}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default PreguntasFrecuentes;

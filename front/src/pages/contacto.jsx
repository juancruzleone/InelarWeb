import React, { useState } from "react";
import Layout from "@/components/layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";
import * as yup from "yup";

const contactSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup.string().email("El correo electrónico debe ser válido").required("El correo electrónico es obligatorio"),
  message: yup.string().required("El mensaje es obligatorio"),
});

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await contactSchema.validate(formData, { abortEarly: false });
      console.log("Enviando mensaje:", formData); // Agrega esta línea
      await fetch("http://localhost:2023/api/contactos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("Mensaje enviado correctamente");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setFormErrors({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newFormErrors = {};
        error.inner.forEach((err) => {
          newFormErrors[err.path] = err.message;
        });
        setFormErrors(newFormErrors);
      }
    }
  };

  return (
    <Layout className={styles.app}>
      <h1 className={styles.tituloPaginas}>Contacto</h1>
      <div className={styles.posicionContacto}>
        <div className={styles.contenedorMapa}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.5053063442057!2d-76.94028418485814!3d-12.113016791441401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91752fd4b06a260f%3A0xe599a84b9d9896b0!2sAv.%20La%20Mar%20490%2C%20Miraflores%2015018%2C%20Peru!5e0!3m2!1sen!2sus!4v1636384902567!5m2!1sen!2sus"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className={styles.contenedorFormulario}>
          <form className={styles.formularioContacto} onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            <span className="error">{formErrors.name}</span>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            <span className="error">{formErrors.email}</span>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
            />
            <span className="error">{formErrors.message}</span>
            <button type="submit" id="boton-contacto">Enviar</button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Contacto;
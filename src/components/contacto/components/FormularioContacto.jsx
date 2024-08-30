import React, { useState } from "react";
import { sendContactForm } from "@/components/contacto/services/FetchContacto";
import { validateName, validateEmail, validateMessage } from "@/components/contacto/utils/ValidacionesContacto";
import styles from "@/styles/Home.module.css";

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
    general: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let error = "";
    if (name === "name") {
      error = validateName(value);
    } else if (name === "email") {
      error = validateEmail(value);
    } else if (name === "message") {
      error = validateMessage(value);
    }

    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    if (nameError || emailError || messageError) {
      setFormErrors({
        name: nameError,
        email: emailError,
        message: messageError,
        general: "",
      });
      return;
    }

    try {
      await sendContactForm(formData);
      onSubmit(); 
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({ name: "", email: "", message: "", general: "" });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setFormErrors((prev) => ({
        ...prev,
        general: "Ocurrió un error al enviar el mensaje. Por favor, inténtelo de nuevo.",
      }));
    }
  };

  return (
    <form className={styles.formularioContacto} onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Escribe tu nombre"
        className={formErrors.name ? styles.inputError : ""}
      />
      {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}

      <label htmlFor="email">Correo electrónico:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Escribe tu correo electrónico"
        className={formErrors.email ? styles.inputError : ""}
      />
      {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

      <label htmlFor="message">Mensaje:</label>
      <textarea
        id="message"
        name="message"
        rows="4"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Escribe un mensaje"
        className={formErrors.message ? styles.inputError : ""}
      />
      {formErrors.message && <p className={styles.error}>{formErrors.message}</p>}

      <button type="submit" id="boton-contacto" className={styles.botonContacto}>
        Enviar
      </button>
      {formErrors.general && <p className={styles.error}>{formErrors.general}</p>}
    </form>
  );
};

export default ContactForm;

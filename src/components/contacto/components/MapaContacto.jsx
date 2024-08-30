import React from "react";
import styles from "@/styles/Home.module.css";

const ContactMap = () => {
  return (
    <div className={styles.contenedorMapa}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.18615416173108!2d-58.476913098561596!3d-34.569650433418985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb73dfb2108cd%3A0x60a2394907b54ab7!2sINELAR%20SRL!5e0!3m2!1ses!2us!4v1717682610340!5m2!1ses!2us"
        width="100%"
        height="400"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default ContactMap;

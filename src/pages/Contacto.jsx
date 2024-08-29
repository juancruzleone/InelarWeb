import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contacto/components/ContactForm";
import ContactMap from "@/components/contacto/components/ContactMap";
import ContactModal from "@/components/contacto/components/ContactModal";
import styles from "@/styles/Home.module.css";

const Contacto = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Layout className={styles.app}>
      <Head>
        <title>Contacto | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloPaginas}>Contacto</h1>
      <div className={styles.posicionContacto}>
        <ContactMap />
        <div className={styles.contenedorFormulario}>
          <ContactForm onSubmit={openModal} />
        </div>
      </div>
      <Footer />
      <ContactModal isOpen={modalIsOpen} closeModal={closeModal} />
    </Layout>
  );
};

export default Contacto;

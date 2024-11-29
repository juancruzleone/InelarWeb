import { useState } from "react";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import FormularioContacto from "@/components/contacto/components/FormularioContacto";
import Mapa from "@/components/contacto/components/Mapa";
import ModalConfirmacion from "@/components/contacto/components/ModalConfirmacion";
import styles from "@/styles/Contacto.module.css";
import { useTheme } from '@/components/ThemeProvider'

const Contacto = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { theme } = useTheme()

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
        <meta name="description" content="Página de contacto de Inelar" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div data-theme={theme}>
        <div className={styles.posicionContacto}>
          <div className={styles.contenedorFormulario}>
            <h1 className={styles.tituloPaginas}>Contacto</h1>
            <FormularioContacto onSubmit={openModal} />
          </div>
          <Mapa />
        </div>
      </div>
      <Footer />
      <ModalConfirmacion
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        mensaje="Mensaje enviado exitosamente"
      />
    </Layout>
  );
};

export default Contacto;
import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import useFormData from "@/components/solicitudServicios/SolicitarInstalacion/hooks/SolicitarInstalacionesState";
import SolicitarInstalacionesForm from "@/components/solicitudServicios/SolicitarInstalacion/components/SolicitarInstalacionesForm";
import SolicitarInstalacionModal from "@/components/solicitudServicios/SolicitarInstalacion/components/SolicitarInstalacionModal";
import styles from "@/styles/Home.module.css";

const SolicitarInstalaciones = () => {
  const {
    formData,
    formErrors,
    products,
    modalIsOpen,
    handleInputChange,
    handleSubmit,
    closeModal,
    handleKeyDown,
  } = useFormData();

  return (
    <Layout>
      <Head>
        <title>Solicitar instalación | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloSolicitudServicio}>Solicitar instalación</h1>
      <div className={styles.contenedorContenidoServicio}>
        <p className={styles.textoSolicitudServicios}>
          Si quieres solicitar nuestro servicio de instalación de dispositivos,
          por favor completa el siguiente formulario con tus datos y los detalles de tu solicitud. Nos pondremos en contacto contigo lo antes posible
          para confirmar la fecha y el precio.
        </p>
        <SolicitarInstalacionesForm
          formData={formData}
          formErrors={formErrors}
          products={products}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
        />
      </div>
      <Footer />
      <SolicitarInstalacionModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </Layout>
  );
};

export default SolicitarInstalaciones;

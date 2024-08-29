import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/index";
import Footer from "@/components/Footer";
import FormularioServicioTecnico from "@/components/solicitudServicios/SolicitarServicioTecnico/components/SolicitarServicioTecnicoForm.jsx";
import ModalExito from "@/components/solicitudServicios/SolicitarServicioTecnico/components/SolicitarServicioTecnicoModal.jsx";
import useFormularioServicioTecnico from "@/components/solicitudServicios/SolicitarServicioTecnico/hooks/SolicitarServicioTecnicoEstado.jsx";
import styles from "@/styles/Home.module.css";

const SolicitarServicioTecnico = () => {
  const {
    formData,
    formErrors,
    productos,
    modalIsOpen,
    setModalIsOpen,
    handleChange,
    handleSubmit,
  } = useFormularioServicioTecnico();

  return (
    <Layout>
      <Head>
        <title>Solicitar servicio técnico | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloSolicitudServicio}>Solicitar servicio técnico</h1>
      <div className={styles.contenedorContenidoServicio}>
        <p className={styles.textoSolicitudServicios}>
          Si quieres solicitar nuestro servicio de reparación de dispositivos,
          por favor completa el siguiente formulario con tus datos y los detalles
          de tu problema. Nos pondremos en contacto contigo lo antes posible
          para confirmar la fecha y el precio.
        </p>
        <FormularioServicioTecnico
          formData={formData}
          formErrors={formErrors}
          productos={productos}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <Footer />
      <ModalExito
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        mensaje="¡Solicitud enviada con éxito!"
        submensaje="Nos pondremos en contacto contigo pronto."
      />
    </Layout>
  );
};

export default SolicitarServicioTecnico;
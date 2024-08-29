import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/index";
import Footer from "@/components/Footer";
import FormularioMantenimiento from "@/components/solicitudServicios/SolicitarMantenimiento/components/SolicitarMantenimientoForm.jsx";
import SolicitarMantenimientoModal from "@/components/solicitudServicios/SolicitarMantenimiento/components/SolicitarMantenimientoModal.jsx";
import useFormularioMantenimiento from "@/components/solicitudServicios/SolicitarMantenimiento/hooks/SolicitarMantenimientoEstado.jsx";
import styles from "@/styles/Home.module.css";

const SolicitarMantenimiento = () => {
  const {
    formData,
    formErrors,
    productos,
    modalIsOpen,
    setModalIsOpen,
    handleChange,
    handleSubmit,
  } = useFormularioMantenimiento();

  return (
    <Layout>
      <Head>
        <title>Solicitar mantenimiento | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloSolicitudServicio}>Solicitar mantenimiento</h1>
      <div className={styles.contenedorContenidoServicio}>
        <p className={styles.textoSolicitudServicios}>
          Si quieres solicitar nuestro servicio de revisión y reparación de dispositivos, por favor completa el siguiente formulario con tus datos y el tipo de dispositivo que necesitas arreglar.
          Nos pondremos en contacto contigo lo antes posible para confirmar la fecha y el precio.
        </p>
        <FormularioMantenimiento
          formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          productos={productos}
        />
      </div>
      <Footer />
      <SolicitarMantenimientoModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </Layout>
  );
};

export default SolicitarMantenimiento;
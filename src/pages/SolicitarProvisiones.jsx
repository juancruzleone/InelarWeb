import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import FormularioProvisiones from "@/components/solicitudServicios/SolicitarProvision/components/SolicitarProvisionesForm.jsx";
import ModalConfirmacion from "@/components/solicitudServicios/SolicitarProvision/components/ModalConfirmacion.jsx";
import useFormularioProvisiones from "@/components/solicitudServicios/SolicitarProvision/hooks/SolicitarProvisionesEstado.jsx";
import styles from "@/styles/Home.module.css";

const SolicitarProvisiones = () => {
  const {
    formData,
    formErrors,
    productList,
    modalIsOpen,
    setModalIsOpen,
    handleChange,
    handleSubmit,
    loadProducts,
  } = useFormularioProvisiones();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <Layout>
      <Head>
        <title>Solicitar provisiones | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloSolicitudServicio}>Solicitar provisiones</h1>
      <div className={styles.contenedorContenidoServicio}>
        <p className={styles.textoSolicitudServicios}>
          Si quieres solicitar nuestro servicio de entrega de provisiones, por favor completa el siguiente formulario con tus datos y los detalles de tu pedido. Nos pondremos en contacto contigo lo antes posible para confirmar la fecha y el precio.
        </p>
        <FormularioProvisiones
          formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          productList={productList}
        />
      </div>
      <Footer />
      <ModalConfirmacion
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        mensaje="Solicitud enviada con éxito"
      />
    </Layout>
  );
};

export default SolicitarProvisiones;

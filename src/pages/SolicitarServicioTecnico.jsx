import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import FormularioServicioTecnico from "@/components/solicitudServicios/SolicitarServicioTecnico/components/SolicitarServicioTecnicoForm.jsx";
import ModalConfirmacion from "@/components/solicitudServicios/SolicitarServicioTecnico/components/ModalConfirmacion.jsx";
import useFormularioServicioTecnico from "@/components/solicitudServicios/SolicitarServicioTecnico/hooks/SolicitarServicioTecnicoEstado.jsx";
import styles from "@/styles/SolicitudServicio.module.css";
import { useTheme } from '@/components/ThemeProvider'

const SolicitarServicioTecnico = () => {
  const { theme } = useTheme()

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
    <Layout  data-theme={theme}>
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
      <ModalConfirmacion
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        mensaje="¡Solicitud enviada con éxito!"
      />
    </Layout>
  );
};

export default SolicitarServicioTecnico;

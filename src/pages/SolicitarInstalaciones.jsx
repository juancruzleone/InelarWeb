import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import useFormData from "@/components/solicitudServicios/SolicitarInstalacion/hooks/SolicitarInstalacionesState";
import SolicitarInstalacionesForm from "@/components/solicitudServicios/SolicitarInstalacion/components/SolicitarInstalacionesForm";
import ModalConfirmacion from "@/components/solicitudServicios/SolicitarInstalacion/components/ModalConfirmacion";
import styles from "@/styles/SolicitudServicio.module.css";
import { useTheme } from '@/components/ThemeProvider'

const SolicitarInstalaciones = () => {
  const { theme } = useTheme()

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
      <div  data-theme={theme}>
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
      </div>
      <Footer />
      <ModalConfirmacion 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        mensaje="Solicitud enviada con éxito"
      />
    </Layout>
  );
};

export default SolicitarInstalaciones;
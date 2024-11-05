import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import FormularioRegistro from "@/components/register/components/FormularioRegistro";
import ModalConfirmacion from "@/components/register/components/ModalConfirmacion"; 
import useRegister from "@/components/register/hooks/useRegister.jsx";
import styles from "@/styles/Register.module.css";
import { useTheme } from '@/components/ThemeProvider'

export default function Register() {
  const { theme } = useTheme()

  const {
    username,
    email,
    password,
    error,
    showModal,
    showPassword,
    modalMessage,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    togglePasswordVisibility,
    closeModal,
  } = useRegister();

  return (
    <Layout className={styles.app}>
      <Head>
        <title>Registro | Inelar</title>
        <meta name="description" content="Registro de usuario en Inelar" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.contenedorPrelogin} data-theme={theme}>
        <div className={styles.formularioPrelogin}>
          <h1 className={styles.tituloPrelogin}>Regístrate</h1>
          <FormularioRegistro
            username={username}
            email={email}
            password={password}
            error={error}
            showPassword={showPassword}
            handleUsernameChange={handleUsernameChange}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleSubmit}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
      </div>
      <Footer />
      <ModalConfirmacion 
        isOpen={showModal} 
        onRequestClose={closeModal} 
        mensaje={modalMessage} 
      />
    </Layout>
  );
}
import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import ModalConfirmacion from "@/components/login/components/ModalConfirmacion"; 
import FormularioLogin from "@/components/login/components/FormularioLogin";
import useLoginState from "@/components/login/hooks/useLogin";
import styles from "@/styles/Home.module.css";

const Login = () => {
  const {
    username,
    password,
    error,
    showModal,
    showPassword,
    setUsername,
    setPassword,
    handleSubmit,
    togglePasswordVisibility,
    closeModal,
  } = useLoginState();

  return (
    <Layout className={styles.app}>
      <Head>
        <title>Inicio sesión | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.contenedorPrelogin}>
        <div className={styles.formularioPrelogin}>
          <h1 className={styles.tituloPrelogin}>Inicia sesión</h1>
          <FormularioLogin
            username={username}
            password={password}
            error={error}
            showPassword={showPassword}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit} // Asegúrate de que esto se pase correctamente
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
      </div>
      <Footer />

      <ModalConfirmacion 
        isOpen={showModal} 
        onRequestClose={closeModal} 
        mensaje="Inicio de sesión exitoso" 
      />
    </Layout>
  );
};

export default Login;
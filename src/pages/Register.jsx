import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/register/components/FormularioRegistro";
import RegisterModal from "@/components/register/components/ModalRegistro";
import useRegister from "@/components/register/components/useRegister";
import styles from "@/styles/Home.module.css";

const Register = () => {
  const {
    username,
    password,
    error,
    showModal,
    showPassword,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
    togglePasswordVisibility,
    closeModal,
  } = useRegister();

  return (
    <Layout className={styles.app}>
      <Head>
        <title>Registro | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.contenedorPrelogin}>
        <div className={styles.formularioPrelogin}>
          <h1 className={styles.tituloPrelogin}>Regístrate</h1>
          <RegisterForm
            username={username}
            password={password}
            error={error}
            showPassword={showPassword}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleSubmit}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
      </div>
      <Footer />
      <RegisterModal isOpen={showModal} closeModal={closeModal} />
    </Layout>
  );
};

export default Register;

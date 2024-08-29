import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/index";
import Footer from "@/components/Footer";
import LoginModal from "@/components/login/components/LoginModal";
import LoginForm from "@/components/login/components/LoginForm";
import useLoginState from "@/components/login/components/LoginState";
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
          <LoginForm
            username={username}
            password={password}
            error={error}
            showPassword={showPassword}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
      </div>
      <Footer />

      <LoginModal isOpen={showModal} closeModal={closeModal} />
    </Layout>
  );
};

export default Login;

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Login = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Validación del lado del cliente
    if (!usuario || !contraseña) {
      setError("Ingrese ambos campos para iniciar sesión.");
      return;
    }

    try {
      const response = await fetch("http://localhost:2023/api/cuenta/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: usuario, password: contraseña }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Manejar errores de validación específicos
        if (errorData.error.message === "Validation error") {
          setError("Usuario o contraseña incorrectos.");
        } else {
          setError(`Error en la solicitud: ${errorData.error.message}`);
        }

        return;
      }

      // Inicio de sesión exitoso
      const data = await response.json();
      console.log("Login response data:", data);

      // Guardar datos del usuario en localStorage
      localStorage.setItem("userData", JSON.stringify(data));

      // Redirigir al panel de administración si el usuario es admin
      if (data.cuenta.role === "admin") {
        router.push("/");
      } else {
        // Redirigir a la página de inicio si no es admin
        router.push("/");
      }
    } catch (error) {
      setError("Error de red");
    }
  };

  return (
    <Layout className={styles.app}>
      <div className={styles.contenedorPrelogin}>
        <div className={styles.formularioPrelogin}>
          <h1 className={styles.tituloPrelogin}>Inicia sesión</h1>
          <form onSubmit={handleSubmit} className={styles.formularioLogin}>
            <label htmlFor="usuario" className={styles.formLabel}>
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <label htmlFor="contraseña" className={styles.formLabel}>
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              placeholder="Ingresa tu contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <button type="submit" className={styles.submitButton}>Iniciar sesión</button>
            {error && <p className={styles.error}>{error}</p>}
            <p>
              Si no tienes una cuenta,{" "}
              <Link href="/register" className={styles.registroLogin}>
                regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Login;

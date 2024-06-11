import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

const Layout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar si el usuario tiene el rol de administrador en localStorage
    const userData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userData")) : null;

    if (userData && userData.cuenta && userData.cuenta.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <main>
      <nav className={styles.nav}>
        <Link href="/" className={styles.seccionesNav}>
          Home
        </Link>
        <Link href="/quienes-somos" className={styles.seccionesNav}>
          Quiénes somos
        </Link>
        <Link href="/servicios" className={styles.seccionesNav}>
          Servicios
        </Link>
        <Link href="/productos" className={styles.seccionesNav}>
          Productos
        </Link>
        <Link href="/preguntas-frecuentes" className={styles.seccionesNav}>
          Preguntas frecuentes
        </Link>
        <Link href="/certificaciones" className={styles.seccionesNav}>
          Certificaciones
        </Link>
        <Link href="/contacto" className={styles.seccionesNav}>
          Contacto
        </Link>
        {isAdmin && (
          <Link href="/panel" className={styles.seccionesNav}>
            Panel admin
          </Link>
        )}
        <a href="/login" className={styles.sesion}>
          <Image
            src="/prelogin.png"
            id="xd"
            alt="Carrito"
            className={styles.carrito}
            width={40}
            height={40}
          />
        </a>
        <a href="/carrito" className={styles.carrito}>
          <Image
            src="/carrito.png"
            alt="Carrito"
            className={styles.carrito}
            id={styles.iconoCarrito}
            width={40}
            height={40}
          />
        </a>
      </nav>
      {children}
    </main>
  );
};

export default Layout;

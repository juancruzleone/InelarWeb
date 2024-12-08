import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import ModalConfirmacion from "@/components/layout/components/ModalConfirmacion";
import styles from "@/styles/Nav.module.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from '@/components/ThemeProvider';

export default function Layout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const userData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userData")) : null;

    if (userData) {
      setIsLoggedIn(true);
      setUserId(userData.cuenta._id);
      if (userData.cuenta && userData.cuenta.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setLogoutModalIsOpen(true);
  };

  const closeModal = () => {
    setLogoutModalIsOpen(false);
    window.location.href = "/login";
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const isActive = (path) => pathname === path;

  return (
    <main data-theme={theme}>
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.logoContainer} ${styles.hiddenMobileTablet}`}>
          <Image
            src="/logo3.svg"
            alt="Logo Inelar"
            width={100}
            height={40}
            className={styles.logo}
          />
        </Link>
        <button className={styles.hamburger} onClick={toggleNav} aria-label="Abrir menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`${styles.navLinks} ${isNavOpen ? styles.open : ''}`}>
          <Link href="/" className={`${styles.seccionesNav} ${isActive('/') ? styles.active : ''}`}>
            Inicio
          </Link>
          <Link href="/quienes-somos" className={`${styles.seccionesNav} ${isActive('/quienes-somos') ? styles.active : ''}`}>
            Quiénes somos
          </Link>
          <Link href="/servicios" className={`${styles.seccionesNav} ${isActive('/servicios') ? styles.active : ''}`}>
            Servicios
          </Link>
          <Link href="/productos" className={`${styles.seccionesNav} ${isActive('/productos') ? styles.active : ''}`}>
            Productos
          </Link>
          <Link href="/contacto" className={`${styles.seccionesNav} ${isActive('/contacto') ? styles.active : ''}`}>
            Contacto
          </Link>
        </div>
        <div className={styles.navIcons}>
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              {isAdmin ? (
                <Link href="/panel" className={styles.sesion} aria-label="Panel de administración">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="40"
                    height="50"
                    fill="none"
                    stroke="#F7931E"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                    <circle cx="19" cy="17" r="3" />
                    <path d="M19 15.5v1.5h1.5" />
                    <path d="M7 7h10" />
                    <path d="M7 11h10" />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link href={`/perfil/${userId}`} className={styles.sesion} aria-label="Perfil de usuario">
                    <Image
                      src="/prelogin2.svg"
                      alt="Perfil de usuario"
                      className={styles.carrito}
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link href="/carrito" className={styles.carrito} aria-label="Carrito de compras">
                    <Image
                      src="/carrito2.svg"
                      alt="Carrito"
                      className={styles.carrito}
                      id={styles.iconoCarrito}
                      width={40}
                      height={40}
                    />
                  </Link>
                </>
              )}
              <button onClick={handleLogout} className={`${styles.sesion} ${styles.logoutButton}`} aria-label="Cerrar sesión">
                <Image
                  src="/logout.svg"
                  alt="Cerrar sesión"
                  className={styles.logoutIcon}
                  width={40}
                  height={40}
                />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.sesion} aria-label="Iniciar sesión">
                <Image
                  src="/prelogin2.svg"
                  alt="Iniciar sesión"
                  className={styles.carrito}
                  id={styles.iconoCarrito}
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="/carrito" className={styles.carrito} aria-label="Carrito de compras">
                <Image
                  src="/carrito2.svg"
                  alt="Carrito"
                  className={styles.carrito}
                  id={styles.iconoCarrito}
                  width={40}
                  height={40}
                />
              </Link>
            </>
          )}
        </div>
      </nav>
      {children}
      <ModalConfirmacion 
        isOpen={logoutModalIsOpen} 
        onRequestClose={closeModal} 
        mensaje="Sesión cerrada exitosamente" 
      />
    </main>
  );
}


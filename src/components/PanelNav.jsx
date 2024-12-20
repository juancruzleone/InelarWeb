import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/PanelNav.module.css";
import { useTheme } from '@/components/ThemeProvider'

const PanelNav = ({ onSolapaClick, solapaActiva }) => {
  const { theme } = useTheme()

  return (
    <main  data-theme={theme}>
      <nav className={styles.navPanel}>
        <button
          onClick={() => onSolapaClick("productos")}
          className={solapaActiva === "productos" ? styles.solapaActiva : styles.seccionesNavPanel}
        >
          Productos
        </button>
        <button
          onClick={() => onSolapaClick("pedidos")}
          className={solapaActiva === "pedidos" ? styles.solapaActiva : styles.seccionesNavPanel}
        >
          Pedidos
        </button>
        <button
          onClick={() => onSolapaClick("clientes")}
          className={solapaActiva === "clientes" ? styles.solapaActiva : styles.seccionesNavPanel}
        >
          Clientes
        </button>
        <button
          onClick={() => onSolapaClick("servicios")}
          className={solapaActiva === "servicios" ? styles.solapaActiva : styles.seccionesNavPanel}
        >
          Servicios
        </button>
        <button
          onClick={() => onSolapaClick("instalaciones")}
          className={solapaActiva === "instalaciones" ? styles.solapaActiva : styles.seccionesNavPanel}
        >
          Instalaciones
        </button>
        <button
          onClick={() => onSolapaClick("mensajes")}
          className={solapaActiva === "mensajes" ? styles.solapaActiva : styles.seccionesNavPanel}
        >
          Mensajes
        </button>
        <button
          onClick={() => onSolapaClick("usuarios")} 
          className={solapaActiva === "usuarios" ? styles.solapaActiva : styles.seccionesNavPanel}
        >
          Usuarios
        </button>
      </nav>
    </main>
  );
};

export default PanelNav;
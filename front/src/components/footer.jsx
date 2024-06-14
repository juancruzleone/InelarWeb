import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerHeadingMain}>
      <Image
            src="/logo elegido.svg"
            alt="logo inelar"
            className={styles.fotoServicio}
            width={150}
            height={150}
          />  
      </div>
      <div className={styles.footerMain}>
        <div className={styles.footerContainer}>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>¿Quiénes somos?</h3>
            <p className={styles.footerText}>
              Somos una empresa especializada en seguridad contra incendios.
            </p>
          </div>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Servicios</h3>
            <ul className={styles.footerList}>
              <li className={styles.footerListItem}>
                <a href="/instalaciones">Instalaciones</a>
              </li>
              <li className={styles.footerListItem}>
                <a href="/mantenimientos">Mantenimientos</a>
              </li>
              <li className={styles.footerListItem}>
                <a href="/serviciotecnico">Servicio técnico</a>
              </li>
              <li className={styles.footerListItem}>
                <a href="/provisiones">Provisiones</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Contacto</h3>
            <ul className={styles.footerList}>
              <li className={styles.footerListItem}>
                <a href="/contacto">Formulario de Contacto</a>
              </li>
              <li className={styles.footerListItem}>
                <a href="/telefono">Teléfono: +123-456-789</a>
              </li>
              <li className={styles.footerListItem}>
                <a href="/email">Email: info@inelar.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Inelar S.R.L. Todos los derechos reservados.</p> 
      </div>
    </footer>
  );
};

export default Footer;

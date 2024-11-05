import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { verifyAccount } from '@/components/register/services/FetchRegistro';
import Layout from "@/components/layout/index";
import styles from "@/styles/Register.module.css";

export default function VerifyEmail() {
  const [message, setMessage] = useState('Verificando tu cuenta...');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      verifyAccount(token)
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            setMessage(data.message);
            setTimeout(() => router.push('/login'), 3000);
          } else {
            throw new Error('Error en la verificación');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setMessage('Hubo un error al verificar tu cuenta. Por favor, intenta iniciar sesión manualmente.');
          setTimeout(() => router.push('/login'), 3000);
        });
    }
  }, [token, router]);

  return (
    <Layout>
      <div className={styles.contenedorPrelogin}>
        <div className={styles.formularioPrelogin}>
          <h1 className={styles.tituloPrelogin}>Verificación de Cuenta</h1>
          <p>{message}</p>
        </div>
      </div>
    </Layout>
  );
}
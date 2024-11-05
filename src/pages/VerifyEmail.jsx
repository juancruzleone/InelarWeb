import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from "@/components/layout/index";
import styles from "@/styles/Register.module.css";

export default function VerifyEmail() {
  const [message, setMessage] = useState('Verificando tu cuenta...');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify/${token}`)
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            setMessage(data.message);
            // Intenta iniciar sesión automáticamente
            return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cuenta/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userName: data.userName, password: data.password }),
            });
          } else {
            throw new Error('Error en la verificación');
          }
        })
        .then(response => response.json())
        .then(loginData => {
          if (loginData.token) {
            localStorage.setItem("userData", JSON.stringify(loginData));
            setTimeout(() => router.push('/'), 2000);
          } else {
            throw new Error('Error en el inicio de sesión automático');
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
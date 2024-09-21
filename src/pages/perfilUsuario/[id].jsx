import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/layout";
import Footer from "@/components/Footer";
import PerfilUsuario from "@/components/perfilUsuarios/components/PerfilUsuario";
import ListaOrdenes from "@/components/perfilUsuarios/components/ListaOrdenes";
import Cargando from "@/components/perfilUsuarios/components/Cargando";
import usePerfil from "@/components/perfilUsuarios/hooks/usePerfil";
import styles from "@/styles/Home.module.css";

export default function PerfilUsuarios() {
  const router = useRouter();
  const { id } = router.query;
  const { user, orders, loading, error } = usePerfil(id);

  useEffect(() => {
    if (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [error]);

  if (loading) {
    return (
      <Layout>
        <Cargando />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.contenedorPaginaPerfil}>
          <p className={styles.errorMensaje}>Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{user ? `Perfil de ${user.userName}` : 'Perfil de Usuario'}</title>
      </Head>
      <Layout>
        <div className={styles.contenedorPaginaPerfil}>
          {user ? (
            <>
              <PerfilUsuario user={user} />
              <ListaOrdenes orders={orders} />
            </>
          ) : (
            <p className={styles.errorMensaje}>Usuario no encontrado</p>
          )}
        </div>
        <Footer />
      </Layout>
    </>
  );
}
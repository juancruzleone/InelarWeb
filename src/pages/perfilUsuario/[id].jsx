import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/layout";
import Footer from "@/components/Footer";
import PerfilUsuario from "@/components/perfilUsuarios/components/PerfilUsuario";
import ListaOrdenes from "@/components/perfilUsuarios/components/ListaOrdenes";
import Cargando from "@/components/perfilUsuarios/components/Cargando";
import usePerfil from "@/components/perfilUsuarios/hooks/usePerfil";
import styles from "@/styles/Perfil.module.css";
import { useTheme } from '@/components/ThemeProvider'

export default function PerfilUsuarios() {
  const router = useRouter();
  const { id } = router.query;
  const { user, orders, loading, error } = usePerfil(id);
  const [filterStatus, setFilterStatus] = useState("todas");
  const { theme } = useTheme()

  useEffect(() => {
    if (error) {
      console.error("Error in PerfilUsuarios:", error);
    }
  }, [error]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredOrders = orders.filter(order => 
    filterStatus === "todas" || order.status === filterStatus
  );

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
    <div  data-theme={theme}>
      <Head>
        <title>{user ? `Perfil de ${user.userName}` : 'Perfil de Usuario'}</title>
      </Head>
      <Layout>
        <div className={styles.contenedorPaginaPerfil}>
          {user ? (
            <>
              <PerfilUsuario user={user} />
              <ListaOrdenes orders={filteredOrders} />
            </>
          ) : (
            <p className={styles.errorMensaje}>Usuario no encontrado</p>
          )}
        </div>
        <Footer />
      </Layout>
    </div>
  );
}
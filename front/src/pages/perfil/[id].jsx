import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout"; // Asegúrate de importar el Layout correctamente

const Perfil = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = localStorage.getItem("userData");
        if (!userData) {
          router.push("/login");
          return;
        }
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.cuenta._id !== id) {
          router.push("/login");
          return;
        }
        setUser(parsedUserData.cuenta);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login");
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (!user) return <p>Cargando...</p>;

  return (
    <Layout>
      <div className={styles.contenedorPerfilUsuario}>
        <div className={styles.contenidoPerfilUsuario}>
          <h1>Perfil de {user.userName}</h1>
          <p className={styles.idUsuario}>{user._id}</p>
        </div>
      </div>
      <div className={styles.contenedorPedidoUsuario}>
          <h2>Listado de pedidos realizados</h2>
        </div>
    </Layout>
  );
};

export default Perfil;

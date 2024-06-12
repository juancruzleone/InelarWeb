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
        <h1>Perfil de {user.userName}</h1>
        <p>{user._id}</p>
    </Layout>
  );
};

export default Perfil;

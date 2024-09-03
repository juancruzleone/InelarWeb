import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/layout";
import Footer from "@/components/Footer";
import ModalEditarPerfil from "@/components/perfil/components/ModalEditarPerfil.jsx";
import ModalConfirmacion from "@/components/perfil/components/ModalEditarPerfil.jsx";
import PerfilUsuario from "@/components/perfil/components/PerfilUsuario.jsx";
import ListaOrdenes from "@/components/perfil/components/ListaOrdenes.jsx";
import Cargando from "@/components/perfil/components/Cargando.jsx";
import usePerfil from "@/components/perfil/hooks/usePerfil.jsx";
import { validateUserName } from "@/components/perfil/utils/ValidacionesPerfil.jsx";

const Perfil = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, orders, loading, error, setUser } = usePerfil(id, router);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setNewUserName(value);

    validateUserName(value, setError);
  };

  const handleUpdateProfile = async () => {
    if (validateUserName(newUserName, setError)) {
      await updateUserProfile(newUserName, setUser, setShowEditModal, setShowConfirmationModal, setError);
    }
  };

  if (loading) {
    return <Cargando />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Head>
        <title>Perfil de Usuario</title>
      </Head>
      <Layout>
        <PerfilUsuario user={user} setShowEditModal={setShowEditModal} />
        <ListaOrdenes orders={orders} />
        <ModalEditarPerfil
          showEditModal={showEditModal}
          handleUserNameChange={handleUserNameChange}
          handleUpdateProfile={handleUpdateProfile}
          error={error}
          setShowEditModal={setShowEditModal}
          newUserName={newUserName}
        />
        <ModalConfirmacion
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      </Layout>
      <Footer />
    </>
  );
};

export default Perfil;

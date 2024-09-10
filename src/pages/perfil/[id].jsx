import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/layout";
import Footer from "@/components/Footer";
import ModalEditarPerfil from "@/components/perfil/components/ModalEditarPerfil.jsx";
import ModalConfirmacion from "@/components/perfil/components/ModalConfirmacion.jsx";
import PerfilUsuario from "@/components/perfil/components/PerfilUsuario.jsx";
import ListaOrdenes from "@/components/perfil/components/ListaOrdenes.jsx";
import Cargando from "@/components/perfil/components/Cargando.jsx";
import usePerfil from "@/components/perfil/hooks/usePerfil.jsx";
import { validateUserName } from "@/components/perfil/utils/ValidacionesPerfil.jsx";
import { updateUserProfile } from "@/components/perfil/services/FetchPerfil.jsx";

const Perfil = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, orders, loading, error, setUser } = usePerfil(id, router);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setNewUserName(value);

    if (!validateUserName(value, setErrorMessage)) {
      setErrorMessage("El nombre de usuario debe tener al menos 6 caracteres");
    } else {
      setErrorMessage(null);
    }
  };

  const handleUpdateProfile = async () => {
    if (validateUserName(newUserName, setErrorMessage)) {
      await updateUserProfile(newUserName, setUser, setShowEditModal, setShowConfirmationModal, setErrorMessage);
      setShowConfirmationModal(true); 
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
          error={errorMessage}
          setShowEditModal={setShowEditModal}
          newUserName={newUserName}
        />
        <ModalConfirmacion
          isOpen={showConfirmationModal}
          onRequestClose={() => setShowConfirmationModal(false)}
          mensaje="Nombre editado exitosamente"
        />
        <Footer />
      </Layout>
 
    </>
  );
};

export default Perfil;
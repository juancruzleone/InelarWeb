import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Layout from "@/components/layout"
import Footer from "@/components/Footer"
import ModalEditarPerfil from "@/components/perfil/components/ModalEditarPerfil"
import ModalConfirmacion from "@/components/perfil/components/ModalConfirmacion"
import PerfilUsuario from "@/components/perfil/components/PerfilUsuario"
import ListaOrdenes from "@/components/perfil/components/ListaOrdenes"
import Cargando from "@/components/perfil/components/Cargando"
import usePerfil from "@/components/perfil/hooks/usePerfil"
import { validateUserName } from "@/components/perfil/utils/ValidacionesPerfil"
import { updateUserProfile } from "@/components/perfil/services/FetchPerfil"
import styles from "@/styles/Perfil.module.css"
import { useTheme } from '@/components/ThemeProvider'

export default function Perfil() {
  const router = useRouter()
  const { id } = router.query
  const { user, orders, loading, error, setUser } = usePerfil(id, router)
  const { theme } = useTheme()

  const [showEditModal, setShowEditModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [newUserName, setNewUserName] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [filterStatus, setFilterStatus] = useState("todas")

  const handleUserNameChange = (e) => {
    const value = e.target.value
    setNewUserName(value)

    if (!validateUserName(value, setErrorMessage)) {
      setErrorMessage("El nombre de usuario debe tener al menos 6 caracteres")
    } else {
      setErrorMessage(null)
    }
  }

  const handleUpdateProfile = async () => {
    if (validateUserName(newUserName, setErrorMessage)) {
      await updateUserProfile(newUserName, setUser, setShowEditModal, setShowConfirmationModal, setErrorMessage)
      setShowConfirmationModal(true)
    }
  }

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value)
  }

  const filteredOrders = orders.filter(order => 
    filterStatus === "todas" || order.status === filterStatus
  )

  return (
    <div data-theme={theme}>
      <Head>
        <title>{user ? `Perfil de ${user.userName}` : 'Perfil de Usuario'}</title>
      </Head>
      <Layout>
        <div className={styles.contenedorPaginaPerfil}>
          {loading ? (
            <Cargando />
          ) : error ? (
            <p className={styles.errorMensaje}>Error: {error}</p>
          ) : (
            <>
              <PerfilUsuario user={user} setShowEditModal={setShowEditModal} />
              <ListaOrdenes orders={filteredOrders} />
            </>
          )}
        </div>
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
    </div>
  )
}
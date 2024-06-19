import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from 'react-modal';
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [error, setError] = useState(null); // Estado para manejar errores
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUserData = async () => {
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

        // Fetch all orders
        const response = await fetch(`http://localhost:2023/api/orders`);
        const data = await response.json();

        // Filter orders for the current user
        const userOrders = data.filter(order => order.userId === id);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error al cargar los datos del usuario");
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  // Función para manejar la actualización del perfil
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`http://localhost:2023/api/cuenta/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Token': localStorage.getItem('authToken')
        },
        body: JSON.stringify({ userName: newUserName })
      });

      if (response.ok) {
        // Actualizar el nombre de usuario en el estado local
        setUser(prevUser => ({
          ...prevUser,
          userName: newUserName
        }));

        // Cerrar el modal
        setShowModal(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error al actualizar el perfil");
    }
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <Layout>
      <div className={styles.contenedorPerfilUsuario}>
        <div className={styles.contenidoPerfilUsuario}>
          <h1>Perfil de {user.userName}</h1>
          <p className={styles.idUsuario}>{user._id}</p>
          {/* Botón para abrir el modal */}
          <button onClick={() => setShowModal(true)} className={styles.botonEditarPerfil}>Editar Perfil</button>
        </div>
      </div>
      <div className={styles.contenedorPedidoUsuario}>
        <h2>Listado de pedidos realizados</h2>
        <div className={styles.contenidoOrdenes}>
          {orders.length === 0 ? (
            <p>No hay pedidos realizados</p>
          ) : (
            <ul>
              {orders.map(order => (
                <li key={order._id} className={styles.ordenes}>
                  <h3>Orden # {order._id}</h3>
                  <p><span>Total:</span> ${order.total}</p>
                  <p><span>Estado:</span> {order.estado}</p>
                  <p><span>Fecha:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.nombre}>
                        <div>
                          <p>{item.nombre} - ${item.precio}</p>
                          <p><span>Cantidad:</span> {item.unidades}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal para editar perfil */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Editar Perfil"
        className={styles.ModalEditarPerfil}
      >
        <h2>Editar Perfil</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Escribe nuevo nombre de usuario"
        />
        <div className={styles.contenedorBotonModalEditarPerfil}>
          <button onClick={handleUpdateProfile} className={styles.botonGuardarCambiosPerfil}>Guardar Cambios</button>
          <button onClick={() => setShowModal(false)} className={styles.botonCancelarCambiosPerfil}>Cancelar</button>
        </div>
        
      </Modal>
    </Layout>
  );
};

export default Perfil;

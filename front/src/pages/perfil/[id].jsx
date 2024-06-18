import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout"; // Asegúrate de importar el Layout correctamente

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
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
    </Layout>
  );
};

export default Perfil;
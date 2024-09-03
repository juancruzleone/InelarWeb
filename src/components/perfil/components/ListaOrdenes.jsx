import styles from '@/styles/Home.module.css';

const ListaOrdenes = ({ orders }) => (
  <div className={styles.contenedorPedidoUsuario}>
    <h2>Listado de pedidos realizados</h2>
    <div className={styles.contenidoOrdenes}>
      {orders.length === 0 ? (
        <p className={styles.textoPedidosRealizados}>No hay pedidos realizados</p>
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
);

export default ListaOrdenes;

import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '@/styles/Perfil.module.css';

const ListaOrdenes = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 5; 

  const offset = currentPage * ordersPerPage;
  const currentPageOrders = orders.slice(offset, offset + ordersPerPage);
  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className={styles.contenedorPedidoUsuario}>
      <h2>Listado de pedidos realizados</h2>
      <div className={styles.contenidoOrdenes}>
        {orders.length === 0 ? (
          <p className={styles.textoPedidosRealizados}>No hay pedidos realizados</p>
        ) : (
          <>
            <ul>
              {currentPageOrders.map(order => (
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
          </>
        )}
      </div>
      <ReactPaginate
              previousLabel={'Anterior'}
              nextLabel={'Siguiente'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
            />
    </div>
  );
};

export default ListaOrdenes;
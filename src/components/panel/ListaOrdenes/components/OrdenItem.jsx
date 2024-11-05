import { useState } from 'react';
import styles from "@/styles/ListaOrdenes.module.css"
import { formatDate, formatCurrency, getOrderStatus } from "@/components/panel/ListaOrdenes/utils/OrdenesUtils.jsx"
import ModalConfirmar from './ModalConfirmar';
import ModalExito from './ModalExito';

export default function Component({ order, onUpdateStatus }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [estado, setEstado] = useState(order.estado || 'no enviado');
  const [error, setError] = useState(null);

  const handleActualizarEstado = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const nuevoEstado = 'enviado';
      await onUpdateStatus(order._id, nuevoEstado);
      setEstado(nuevoEstado);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudo actualizar el estado del pedido. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const getEstadoClass = () => {
    if (estado === 'no enviado') {
      return styles.pendiente;
    } else if (estado === 'enviado') {
      return styles.realizado;
    }
    return '';
  };

  return (
    <div className={styles.tarjetaOrdenPanel}>
      <div className={styles.tarjetaHeader}>
        <h3>Pedido: #{order._id}</h3>
        <span className={`${styles.estadoOrden} ${getEstadoClass()}`} id={styles.estadoOrden}>
          {getOrderStatus(estado)}
        </span>
      </div>
      <div className={styles.contenidoTarjetaOrdenPanel}>
        <p><span>Fecha:</span> {formatDate(order.createdAt)}</p>
        <p><span>Total:</span> {formatCurrency(order.total)}</p>
        <p><span>Usuario:</span> {order.userName || 'No disponible'}</p>
        <p><span>Email del cliente:</span> {order.email || 'No disponible'}</p>
        <p><span>Productos:</span></p>
        <ul>
          {order.items && order.items.map((item, index) => (
            <li key={index}>{item.nombre} - Cantidad: {item.unidades}</li>
          ))}
        </ul>
      </div>
      {estado !== 'enviado' && (
        <button 
          onClick={() => setIsModalOpen(true)} 
          disabled={isLoading}
          className={styles.botonCompletar}
        >
          Marcar como enviado
        </button>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <ModalConfirmar
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={order}
        onConfirm={handleActualizarEstado}
        isLoading={isLoading}
      />
      <ModalExito
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message="El pedido se marcó como enviado exitosamente."
      />
    </div>
  )
}
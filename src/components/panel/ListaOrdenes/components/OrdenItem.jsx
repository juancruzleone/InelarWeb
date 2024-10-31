import { useState } from 'react';
import styles from "@/styles/ListaOrdenes.module.css"
import { formatDate, formatCurrency, getOrderStatus } from "@/components/panel/ListaOrdenes/utils/OrdenesUtils.jsx"
import ModalConfirmar from './ModalConfirmar';

export default function OrdenItem({ order, onUpdateStatus }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estado, setEstado] = useState(order.estado || 'pendiente');

  const handleActualizarEstado = async () => {
    setIsLoading(true);
    try {
      const nuevoEstado = estado === 'procesando' ? 'enviado' : 'entregado';
      const success = await onUpdateStatus(order._id, nuevoEstado);
      if (success) {
        setEstado(nuevoEstado);
      } else {
        throw new Error('Error al actualizar el estado de la orden');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el estado de la orden');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.tarjetaOrdenPanel}>
      <div className={styles.tarjetaHeader}>
        <h3>Orden: #{order._id}</h3>
        <span className={`${styles.estadoOrden} ${styles[estado]}`} id={styles.estadoOrden}>
          {getOrderStatus(estado)}
        </span>
      </div>
      <div className={styles.contenidoTarjetaOrdenPanel}>
        <p><span>Fecha:</span> {formatDate(order.createdAt)}</p>
        <p><span>Total:</span> {formatCurrency(order.total)}</p>
        <p><span>Productos:</span></p>
        <ul>
          {order.items && order.items.map((item, index) => (
            <li key={index}>{item.nombre} - Cantidad: {item.unidades}</li>
          ))}
        </ul>
      </div>
      {estado !== 'entregado' && estado !== 'cancelado' && (
        <button 
          onClick={() => setIsModalOpen(true)} 
          disabled={isLoading}
          className={styles.botonCompletar}
        >
          {estado === 'procesando' ? 'Marcar como enviado' : 'Marcar como entregado'}
        </button>
      )}
      
      <ModalConfirmar
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={order}
        onConfirm={handleActualizarEstado}
        isLoading={isLoading}
      />
    </div>
  )
}
import { useState } from 'react';
import styles from "@/styles/ListaServicios.module.css"
import { capitalizeFirstLetter } from "@/components/panel/ListaServicios/utils/StringUtils.jsx"
import ModalConfirmar from './ModalConfirmar';
import ModalExito from './ModalExito';

export default function ServicioItem({ service, onUpdateStatus }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalConfirmarOpen, setIsModalConfirmarOpen] = useState(false);
  const [isModalExitoOpen, setIsModalExitoOpen] = useState(false);
  const [estado, setEstado] = useState(service.estado || 'no realizado');

  const handleCompletarServicio = async () => {
    setIsLoading(true);
    try {
      const success = await onUpdateStatus(service._id);
      if (success) {
        setEstado('realizado');
        setIsModalConfirmarOpen(false);
        setIsModalExitoOpen(true);
      } else {
        throw new Error('Error al actualizar el estado del servicio');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el estado del servicio');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.tarjetaProductoPanel}>
      <div className={styles.tarjetaHeader}>
        <h3>Cliente: {service.nombre || 'Sin nombre'}</h3>
        <span className={`${styles.estadoServicio} ${estado === 'realizado' ? styles.realizado : styles.pendiente}`} id={styles.estadoServicio}>
          {capitalizeFirstLetter(estado)}
        </span>
      </div>
      <p className={styles.categoriaServicio}>{capitalizeFirstLetter(service.category || '')}</p>
      <div className={styles.contenidoTarjetaProductoPanel}>
        <p><span>Email:</span> {service.email || 'No disponible'}</p>
        <p><span>Télefono:</span> {service.telefono || 'No disponible'}</p>
        <p><span>Dirección:</span> {service.direccion || 'No disponible'}</p>
        <p><span>Dispositivo:</span> {service.dispositivo || 'No disponible'}</p>
        <p><span>Cantidad:</span> {service.cantidad || 'No disponible'}</p>
        <p><span>Fecha:</span> {service.fecha || 'No disponible'}</p>
      </div>
      {estado !== 'realizado' && (
        <button 
          onClick={() => setIsModalConfirmarOpen(true)} 
          disabled={isLoading}
          className={styles.botonCompletar}
        >
          Marcar como realizado
        </button>
      )}
      
      <ModalConfirmar
        isOpen={isModalConfirmarOpen}
        onClose={() => setIsModalConfirmarOpen(false)}
        service={service}
        onConfirm={handleCompletarServicio}
        isLoading={isLoading}
      />

      <ModalExito
        isOpen={isModalExitoOpen}
        onClose={() => setIsModalExitoOpen(false)}
        message="Servicio realizado exitosamente."
      />
    </div>
  )
}
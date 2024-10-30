import { useState } from 'react';
import styles from "@/styles/ListaServicios.module.css"
import { capitalizeFirstLetter } from "@/components/panel/ListaServicios/utils/StringUtils.jsx"

export default function ServicioItem({ service }) {
  const [isLoading, setIsLoading] = useState(false);
  const [estado, setEstado] = useState(service.estado || 'pendiente');

  const handleCompletarServicio = async () => {
    setIsLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      const response = await fetch(`https://inelarweb-back.onrender.com/api/servicios/${service._id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify({ estado: 'realizado' })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado del servicio');
      }

      setEstado('realizado');
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
          onClick={handleCompletarServicio} 
          disabled={isLoading}
          className={styles.botonCompletar}
        >
          {isLoading ? 'Actualizando...' : 'Marcar como realizado'}
        </button>
      )}
    </div>
  )
}
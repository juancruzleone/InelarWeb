import styles from "@/styles/ListaServicios.module.css"
import { capitalizeFirstLetter } from "@/components/panel/ListaServicios/utils/StringUtils.jsx"

export default function ServicioItem({ service }) {
  return (
    <div className={styles.tarjetaProductoPanel}>
      <h3>Cliente: {service.nombre}</h3>
      <p className={styles.categoriaServicio}> {capitalizeFirstLetter(service.category)}</p>
      <div className={styles.contenidoTarjetaProductoPanel}>
        <p><span>Email:</span> {service.email}</p>
        <p><span>Télefono:</span> {service.telefono}</p>
        <p><span>Dirección:</span> {service.direccion}</p>
        <p><span>Dispositivo:</span> {service.dispositivo}</p>
        <p><span>Cantidad:</span> {service.cantidad}</p>
        <p><span>Fecha:</span> {service.fecha}</p>
    
      </div>
    </div>
  )
}
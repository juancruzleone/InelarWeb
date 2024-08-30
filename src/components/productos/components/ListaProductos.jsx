import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

const ListaProductos = ({ productos, loading }) => {
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className={styles.contenedorProductos}>
      {productos.map((producto, index) => (
        <div key={index} className={styles.tarjetaProducto}>
          <Image
            src={producto.imagen}
            alt={`Imagen del producto ${producto.name}`}
            width={120}
            height={120}
            className={styles.imagenProducto}
            priority={index === 0}  
          />
          <h2 className={styles.nombreProducto}>{producto.name}</h2>
          <p>${producto.price}</p>
          <Link href={`/detalle/${producto._id}`} className={styles.botonVerMas}>
            Ver más
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListaProductos;

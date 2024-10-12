import styles from "@/styles/Productos.module.css";

const Categorias = ({ changeCategory, categoriaSeleccionada }) => {
  return (
    <div className={styles.contenedorCategoriasProductos} id={styles.contenedorCategoriaProductos}>
      <div className={styles.contenedorCategorias}>
        <a
          onClick={() => changeCategory(null)}
          className={categoriaSeleccionada === null ? styles.categoriaSeleccionadaProducto : ""}
        >
          Todos
        </a>
        <a
          onClick={() => changeCategory("detección")}
          className={categoriaSeleccionada === "detección" ? styles.categoriaSeleccionadaProducto : ""}
        >
          Detección
        </a>
        <a
          onClick={() => changeCategory("extinción")}
          className={categoriaSeleccionada === "extinción" ? styles.categoriaSeleccionadaProducto : ""}
        >
          Extinción
        </a>
      </div>
    </div>
  );
};

export default Categorias;

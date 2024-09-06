import styles from "@/styles/Home.module.css";
import { capitalizeFirstLetter } from "@/components/panel/ListaServicios/utils/StringUtils.jsx";

export default function CategoriaItem({ category, isSelected, onClick }) {
  return (
    <div
      className={`${styles.contenedorCategoria} ${
        isSelected ? styles.categoriaSeleccionada : ""
      }`}
      onClick={onClick}
    >
      <p>{capitalizeFirstLetter(category)}</p>
    </div>
  );
}

import Image from "next/image";
import styles from "@/styles/Home.module.css";

const FormularioEditar = ({
  selectedProduct,
  errors,
  handleInputChange,
  handleFileChange,
  handleTextareaInput,
  handleSubmit,
  categories,
  handleCloseModal,
  previewImage,
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={selectedProduct?.name || ""}
        onChange={handleInputChange}
      />
      {errors.name && <p className={styles.errorPanel}>{errors.name}</p>}

      <label htmlFor="categoria">Categoría:</label>
      <select
        id="categoria"
        name="categoria"
        value={selectedProduct?.categoria || ""}
        onChange={handleInputChange}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((categoria, index) => (
          <option key={index} value={categoria}>
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </option>
        ))}
      </select>
      {errors.categoria && <p className={styles.errorPanel}>{errors.categoria}</p>}

      <label htmlFor="description">Descripción:</label>
      <textarea
        id="description"
        name="description"
        value={selectedProduct?.description || ""}
        onChange={handleTextareaInput}
        className={styles.textarea}
      ></textarea>
      {errors.description && <p className={styles.errorPanel}>{errors.description}</p>}

      <label htmlFor="price">Precio:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={selectedProduct?.price || ""}
        onChange={handleInputChange}
      />
      {errors.price && <p className={styles.errorPanel}>{errors.price}</p>}

      <label>Imagen Actual</label>
      <div className={styles.contenedorImagenActual}>
        {(previewImage || selectedProduct?.imagen) && (
          <Image
            src={previewImage || selectedProduct.imagen}
            alt={selectedProduct?.alt || "Imagen del producto"}
            width={100}
            height={100}
          />
        )}
      </div>

      <label htmlFor="imagen">Imagen:</label>
      <input
        type="file"
        id="imagen"
        name="imagen"
        accept="image/*"
        onChange={handleFileChange}
      />
      {errors.imagen && !selectedProduct?.imagen && (
        <p className={styles.errorPanel}>{errors.imagen}</p>
      )}

      <div className={styles.contenedorBotonesModal}>
        <button type="submit" className={styles.botonPrimarioPanel}>
          Guardar
        </button>
        <button onClick={handleCloseModal} className={styles.botonSecundarioPanel} id={styles.botonCerrar}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioEditar;
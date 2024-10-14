import styles from "@/styles/ListaProductos.module.css";

const FormularioCrear = ({ 
  newProduct, 
  errors, 
  handleInputChange, 
  handleFileChange, 
  handleTextareaInput, 
  handleSubmit, 
  onClose, 
  categories 
}) => {

  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={newProduct.name}
        onChange={handleInputChange}
        placeholder="Escribe el nombre del producto"
      />
      {errors.name && <p className={styles.errorPanel}>{errors.name}</p>}

      <label htmlFor="categoria">Categoría:</label>
      <select
        id="categoria"
        name="categoria"
        value={newProduct.categoria}
        onChange={handleInputChange}
        placeholder="Selecciona una categoría"
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
        value={newProduct.description}
        onChange={handleTextareaInput}
        placeholder="Escribe la descripción del producto"
        className={styles.textarea}
      ></textarea>
      {errors.description && <p className={styles.errorPanel}>{errors.description}</p>}

      <label htmlFor="price">Precio:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
        placeholder="Escribe el precio del producto"
      />
      {errors.price && <p className={styles.errorPanel}>{errors.price}</p>}

      <label htmlFor="imagen">Imagen:</label>
      <input
        type="file"
        id="imagen"
        name="imagen"
        accept="image/*"
        onChange={handleFileChange}
        placeholder="Selecciona una imagen"
      />
      {errors.imagen && !newProduct.imagen && (
        <p className={styles.errorPanel}>{errors.imagen}</p>
      )}

      <div className={styles.contenedorBotonesModal}>
        <button type="submit" className={styles.botonPrimarioPanel}>Guardar</button>
        <button type="button" onClick={onClose} id={styles.botonCerrar}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioCrear;

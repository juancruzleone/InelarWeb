import { useEffect } from "react";
import Image from 'next/image';
import styles from "@/styles/Home.module.css";
import searchProducts from "@/components/panel/ListaProductos/utils/buscador.jsx";
import useProductos from "@/components/panel/ListaProductos/hooks/useProductos.jsx";
import CrearProductoModal from "@/components/panel/ListaProductos/components/ModalCrear.jsx";
import EditarProductoModal from "@/components/panel/ListaProductos/components/ModalEditar.jsx";
import EliminarProductoModal from "@/components/panel/ListaProductos/components/ModalEliminar.jsx";
import ConfirmacionModal from "@/components/panel/ListaProductos/components/ModalConfirmacion.jsx";

const ListaProductos = () => {
  const {
    products,
    filteredProducts,
    setFilteredProducts,
    categories,
    selectedCategory,
    createModal,
    editModal,
    deleteModal,
    confirmationModal,
    confirmationMessage,
    selectedProduct,
    newProduct,
    search,
    errors,
    loading,
    previewImage,
    setCreateModal,
    setEditModal,
    setDeleteModal,
    setConfirmationModal,
    setSelectedCategory,
    setSearch,
    handleCreateProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleCloseModal,
    showConfirmation,
    fetchProductsData,
    handleInputChange,
    handleEditInputChange,
    handleFileChange,
    handleEditFileChange,
    handleTextareaInput,
    handleEditTextareaInput,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
  } = useProductos();

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  useEffect(() => {
    const filtered = searchProducts(selectedCategory, search, products);
    setFilteredProducts(filtered);
  }, [selectedCategory, search, products, setFilteredProducts]);

  return (
    <div className={styles.contenedorPagina}>
      <h2 className={styles.tituloPaginasPanel}>Productos</h2>
      <button onClick={handleCreateProduct} className={styles.botonCrearModal}>
        Crear Producto
      </button>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.buscadorPanel}
        placeholder="Busca el nombre del producto"
        aria-label="Buscar producto"
      />
      <div className={styles.posicionSeccionProductos}>
        <div className={styles.contenedorCategorias}>
          {["Todos", ...categories].map((categoria, index) => (
            <div
              key={index}
              className={`${styles.contenedorCategoria} ${
                categoria === selectedCategory ? styles.categoriaSeleccionada : ""
              }`}
              onClick={() => setSelectedCategory(categoria)}
            >
              <p>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</p>
            </div>
          ))}
        </div>
        <div className={styles.contenedorClientes}>
          {loading ? (
            <p>Cargando productos...</p>
          ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className={styles.tarjetaProductoPanelClientes}>
                <h3>{product.name}</h3>
                <div>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className={styles.botonEditar}
                  >
                    <Image
                      src="/editar.svg"
                      alt="Editar"
                      className={styles.iconoEditar}
                      width={30}
                      height={30}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product)}
                    className={styles.botonEliminar}
                  >
                    <Image
                      src="/eliminar.svg"
                      alt="Eliminar"
                      className={styles.iconoEliminar}
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.textoBuscadorProductos}>
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          )}
        </div>
      </div>

      <CrearProductoModal
        isOpen={createModal}
        onClose={handleCloseModal}
        newProduct={newProduct}
        errors={errors}
        showConfirmation={showConfirmation}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleTextareaInput={handleTextareaInput}
        handleSubmit={handleCreateSubmit}
        categories={categories}
      />

      <EditarProductoModal
        isOpen={editModal}
        onClose={handleCloseModal}
        selectedProduct={selectedProduct}
        errors={errors}
        showConfirmation={showConfirmation}
        handleInputChange={handleEditInputChange}
        handleFileChange={handleEditFileChange}
        handleTextareaInput={handleEditTextareaInput}
        handleSubmit={handleEditSubmit}
        categories={categories}
        previewImage={previewImage}
      />

      <EliminarProductoModal
        isOpen={deleteModal}
        onClose={handleCloseModal}
        selectedProduct={selectedProduct}
        handleDeleteSubmit={handleDeleteSubmit}
      />

      <ConfirmacionModal
        isOpen={confirmationModal}
        message={confirmationMessage}
        onClose={() => setConfirmationModal(false)}
      />
    </div>
  );
}

export default ListaProductos
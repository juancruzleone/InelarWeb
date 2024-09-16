import { useEffect } from "react";
import Image from 'next/image';
import styles from "@/styles/Home.module.css";
import { searchInstallations } from "@/components/panel/ListaInstalaciones/utils/buscador";
import useInstalaciones from "@/components/panel/ListaInstalaciones/hooks/useInstalaciones";
import CrearInstalacionModal from "@/components/panel/ListaInstalaciones/components/ModalCrear";
import EditarInstalacionModal from "@/components/panel/ListaInstalaciones/components/ModalEditar";
import EliminarInstalacionModal from "@/components/panel/ListaInstalaciones/components/ModalEliminar";
import ConfirmacionModal from "@/components/panel/ListaInstalaciones/components/ModalConfirmacion";

const ListaInstalaciones = () => {
  const {
    installations,
    filteredInstallations,
    setFilteredInstallations,
    categories,
    selectedCategory,
    createModal,
    editModal,
    deleteModal,
    confirmationModal,
    confirmationMessage,
    selectedInstallation,
    newInstallation,
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
    handleCreateInstallation,
    handleEditInstallation,
    handleDeleteInstallation,
    handleCloseModal,
    showConfirmation,
    fetchInstallationsData,
    handleInputChange,
    handleEditInputChange,
    handleFileChange,
    handleEditFileChange,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
  } = useInstalaciones();

  useEffect(() => {
    fetchInstallationsData();
  }, [fetchInstallationsData]);

  useEffect(() => {
    const filtered = searchInstallations(selectedCategory, search, installations);
    setFilteredInstallations(filtered);
  }, [selectedCategory, search, installations, setFilteredInstallations]);

  const handleAddDevice = (installation) => {
    // Implementar la lógica para agregar dispositivo
    console.log("Agregar dispositivo a", installation.company);
  };

  const handleViewDevices = (installation) => {
    // Implementar la lógica para ver listado de dispositivos
    console.log("Ver dispositivos de", installation.company);
  };

  return (
    <div className={styles.contenedorPagina}>
      <h2 className={styles.tituloPaginasPanel}>Instalaciones</h2>
      <button onClick={handleCreateInstallation} className={styles.botonCrearModal}>
        Crear Instalación
      </button>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.buscadorPanel}
        placeholder="Busca el nombre de la instalación"
        aria-label="Buscar instalación"
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
              <p>{categoria ? categoria.charAt(0).toUpperCase() + categoria.slice(1) : "Sin Categoría"}</p>
            </div>
          ))}
        </div>
        <div className={styles.contenedorClientes}>
          {loading ? (
            <p>Cargando instalaciones...</p>
          ) : Array.isArray(filteredInstallations) && filteredInstallations.length > 0 ? (
            filteredInstallations.map((installation) => (
              <div key={installation._id} className={styles.tarjetaProductoPanelInstalaciones}>
                <div className={styles.tarjetaContenido}>
                  <h3 className={styles.tarjetaTitulo}>{installation.company || 'Sin nombre'}</h3>
                  <div className={styles.tarjetaDireccion}>
                    <address>{installation.address}, {installation.floorSector}</address>
                  </div>
                  <p className={styles.TipoInstalacion}>{installation.installationType}</p>
                </div>
                <div className={styles.tarjetaBotones}>
                  <div className={styles.botonesDispositivos}>
                    <button
                      onClick={() => handleAddDevice(installation)}
                      id={styles.botonAgregarDispositivo}
                    >
                      Agregar dispositivo
                    </button>
                    <button
                      onClick={() => handleViewDevices(installation)}
                      id={styles.botonVerDispositivos}
                    >
                      Ver listado de dispositivos
                    </button>
                  </div>
                  <div className={styles.botonesEdicionEliminacion}>
                    <button
                      onClick={() => handleEditInstallation(installation)}
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
                      onClick={() => handleDeleteInstallation(installation)}
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
              </div>
            ))
          ) : (
            <p className={styles.textoBuscadorProductos}>
              No se encontraron instalaciones que coincidan con tu búsqueda.
            </p>
          )}
        </div>
      </div>

      <CrearInstalacionModal
        isOpen={createModal}
        onClose={handleCloseModal}
        newInstallation={newInstallation}
        errors={errors}
        showConfirmation={showConfirmation}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleCreateSubmit}
        categories={categories}
      />

      <EditarInstalacionModal
        isOpen={editModal}
        onClose={handleCloseModal}
        selectedInstallation={selectedInstallation}
        errors={errors}
        showConfirmation={showConfirmation}
        handleInputChange={handleEditInputChange}
        handleFileChange={handleEditFileChange}
        handleSubmit={handleEditSubmit}
        categories={categories}
        previewImage={previewImage}
      />

      <EliminarInstalacionModal
        isOpen={deleteModal}
        onClose={handleCloseModal}
        selectedInstallation={selectedInstallation}
        handleDeleteSubmit={handleDeleteSubmit}
      />

      <ConfirmacionModal
        isOpen={confirmationModal}
        message={confirmationMessage}
        onClose={() => setConfirmationModal(false)}
      />
    </div>
  );
};

export default ListaInstalaciones;
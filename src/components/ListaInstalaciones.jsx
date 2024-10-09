import React, { useEffect, useState } from "react";
import Image from 'next/image';
import styles from "@/styles/Home.module.css";
import { searchInstallations } from "@/components/panel/ListaInstalaciones/utils/buscador";
import useInstalaciones from "@/components/panel/ListaInstalaciones/hooks/useInstalaciones";
import CrearInstalacionModal from "@/components/panel/ListaInstalaciones/components/ModalCrear";
import EditarInstalacionModal from "@/components/panel/ListaInstalaciones/components/ModalEditar";
import EliminarInstalacionModal from "@/components/panel/ListaInstalaciones/components/ModalEliminar";
import ConfirmacionModal from "@/components/panel/ListaInstalaciones/components/ModalConfirmacion";
import ModalCrearDispositivo from "@/components/panel/ListaInstalaciones/dispositivos/components/ModalCrear";
import ModalEditarDispositivo from "@/components/panel/ListaInstalaciones/dispositivos/components/ModalEditar";
import ModalEliminarDispositivo from "@/components/panel/ListaInstalaciones/dispositivos/components/ModalEliminar";
import ModalImprimirQR from "@/components/panel/ListaInstalaciones/dispositivos/components/ModalImprimirQR";
import { fetchDevicesFromInstallation } from "@/components/panel/ListaInstalaciones/dispositivos/services/FetchDispositivos";
import { deleteInstallation } from "@/components/panel/ListaInstalaciones/services/FetchInstalaciones";

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
    createErrors,
    editErrors,
    loading,
    previewImage,
    setCreateModal,
    setEditModal,
    setDeleteModal,
    setConfirmationModal,
    setSelectedCategory,
    setSearch,
    setNewInstallation,
    setCreateErrors,
    setEditErrors,
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
  } = useInstalaciones();

  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [isEditDeviceModalOpen, setEditDeviceModalOpen] = useState(false);
  const [isDeleteDeviceModalOpen, setDeleteDeviceModalOpen] = useState(false);
  const [isPrintQRModalOpen, setPrintQRModalOpen] = useState(false);
  const [selectedInstallationForDevice, setSelectedInstallationForDevice] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [viewingDevices, setViewingDevices] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchInstallationsData();
  }, [fetchInstallationsData]);

  useEffect(() => {
    const filtered = searchInstallations(selectedCategory, search, installations);
    setFilteredInstallations(filtered);
  }, [selectedCategory, search, installations, setFilteredInstallations]);

  const handleAddDevice = (installation) => {
    setSelectedInstallationForDevice(installation);
    setDeviceModalOpen(true);
  };

  const handleViewDevices = async (installation) => {
    setViewingDevices(true);
    setSelectedInstallationForDevice(installation);
    setLoadingDevices(true);
    const fetchedDevices = await fetchDevicesFromInstallation(installation._id);
    if (!fetchedDevices.error) {
      setDevices(fetchedDevices);
    } else {
      console.error("Error fetching devices:", fetchedDevices.error);
      setDevices([]);
    }
    setLoadingDevices(false);
  };

  const handleBackToInstallations = () => {
    setViewingDevices(false);
    setSelectedInstallationForDevice(null);
  };

  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    setEditDeviceModalOpen(true);
  };

  const handleDeleteDevice = (device) => {
    setSelectedDevice(device);
    setDeleteDeviceModalOpen(true);
  };

  const handlePrintQR = (device) => {
    setSelectedDevice(device);
    setPrintQRModalOpen(true);
  };

  const handleDeviceDeleted = (deletedDeviceId) => {
    setDevices(prevDevices => prevDevices.filter(device => device._id !== deletedDeviceId));
  };

  const handleDeviceUpdated = (updatedDevice) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device._id === updatedDevice._id ? updatedDevice : device
      )
    );
  };

  const handleCloseDeviceModal = () => {
    setDeviceModalOpen(false);
  };

  const handleDeleteSubmit = async () => {
    if (!selectedInstallation) {
      console.error("No installation selected for deletion");
      return;
    }
    setIsDeleting(true);
    try {
      await deleteInstallation(selectedInstallation._id);
      await fetchInstallationsData();
      showConfirmation("Instalación eliminada exitosamente");
      setDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar la instalación:", error);
      showConfirmation("Error al eliminar la instalación");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.contenedorPagina}>
      {!viewingDevices ? (
        <>
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
        </>
      ) : (
        <div className={styles.contenedorDispositivos}>
          <h2 className={styles.tituloPaginasPanel}>
            Dispositivos ({selectedInstallationForDevice?.company})
          </h2>
          <button onClick={handleBackToInstallations} className={styles.botonVolver}>
            Volver a Instalaciones
          </button>
          <div className={styles.listaDispositivos}>
            {loadingDevices ? (
              <p>Cargando dispositivos...</p>
            ) : devices.length > 0 ? (
              devices.map((device) => (
                <div key={device._id} className={styles.tarjetaProductoPanelDispositivos}>
                  <div className={styles.tarjetaContenido}>
                    <h3 className={styles.tituloDispositivo}>{device.nombre}</h3>
                    <p className={styles.ubicacionDispositivo}>Ubicación: {device.ubicacion}</p>
                    <p className={styles.categoriaDispositivo}>{device.categoria}</p>
                  </div>
                  <div className={styles.botonesEdicionEliminacion}>
                    <button onClick={() => handlePrintQR(device)} className={styles.botonImprimir} id={styles.botonImprimir}>
                      <Image
                        src="/imprimir.svg"
                        alt="Imprimir QR"
                        className={styles.iconoQR}
                        width={20}
                        height={20}
                      />
                    </button>
                    <button onClick={() => handleEditDevice(device)} className={styles.botonEditar}>
                      <Image
                        src="/editar.svg"
                        alt="Editar"
                        className={styles.iconoEditar}
                        width={20}
                        height={20}
                      />
                    </button>
                    <button onClick={() => handleDeleteDevice(device)} className={styles.botonEliminar}>
                      <Image
                        src="/eliminar.svg"
                        alt="Eliminar"
                        className={styles.iconoEliminar}
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron dispositivos para esta instalación.</p>
            )}
          </div>
        </div>
      )}

      {/* Modales */}
      <CrearInstalacionModal
        isOpen={createModal}
        handleClose={handleCloseModal}
        handleSubmit={handleCreateSubmit}
        errors={createErrors}
        previewImage={previewImage}
        newInstallation={newInstallation}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        setErrors={setCreateErrors}
        categories={categories}
        onClose={() => setCreateModal(false)}
      />
      <EditarInstalacionModal
        isOpen={editModal}
        handleClose={handleCloseModal}
        handleSubmit={handleEditSubmit}
        errors={editErrors}
        selectedInstallation={selectedInstallation}
        handleEditInputChange={handleEditInputChange}
        handleFileChange={handleEditFileChange}
        setErrors={setEditErrors}
        categories={categories}
        showConfirmation={showConfirmation}  
      />
      <EliminarInstalacionModal
        isOpen={deleteModal}
        onRequestClose={() => setDeleteModal(false)}
        onConfirm={handleDeleteSubmit}
        isDeleting={isDeleting}
      />
      <ConfirmacionModal
        isOpen={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        message={confirmationMessage}
      />
      <ModalCrearDispositivo
        isOpen={isDeviceModalOpen}
        onClose={handleCloseDeviceModal}
        installationId={selectedInstallationForDevice?._id}
      />
      <ModalEditarDispositivo
        isOpen={isEditDeviceModalOpen}
        onClose={() => setEditDeviceModalOpen(false)}
        selectedDevice={selectedDevice}
        installation={selectedInstallationForDevice}
        onDeviceUpdated={handleDeviceUpdated}
      />
      <ModalEliminarDispositivo
        isOpen={isDeleteDeviceModalOpen}
        onClose={() => setDeleteDeviceModalOpen(false)}
        selectedDevice={selectedDevice}
        installation={selectedInstallationForDevice}
        onDeviceDeleted={handleDeviceDeleted}
      />
      <ModalImprimirQR
        isOpen={isPrintQRModalOpen}
        onClose={() => setPrintQRModalOpen(false)}
        codigoQR={selectedDevice?.codigoQR}
      />
    </div>
  );
};

export default ListaInstalaciones;
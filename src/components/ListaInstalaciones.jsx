import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from "@/styles/ListaInstalaciones.module.css";
import stylesDevices from "@/styles/ListaDispositivos.module.css"
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
import { fetchDevicesFromInstallation, getLastMaintenance } from "@/components/panel/ListaInstalaciones/dispositivos/services/FetchDispositivos";
import { deleteInstallation } from "@/components/panel/ListaInstalaciones/services/FetchInstalaciones";
import { useTheme } from '@/components/ThemeProvider';
import { WrenchIcon } from 'lucide-react';

const ListaInstalaciones = () => {
  const router = useRouter();
  const { theme } = useTheme()
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
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deviceSearch, setDeviceSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const deviceListRef = useRef(null);

  useEffect(() => {
    fetchInstallationsData();
    
    const savedViewingDevices = localStorage.getItem('viewingDevices');
    const savedSelectedInstallation = localStorage.getItem('selectedInstallation');
    
    if (savedViewingDevices === 'true' && savedSelectedInstallation) {
      setViewingDevices(true);
      setSelectedInstallationForDevice(JSON.parse(savedSelectedInstallation));
      handleViewDevices(JSON.parse(savedSelectedInstallation));
    }

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [fetchInstallationsData]);

  useEffect(() => {
    const filtered = searchInstallations(selectedCategory, search, installations);
    setFilteredInstallations(filtered);
  }, [selectedCategory, search, installations, setFilteredInstallations]);

  useEffect(() => {
    if (devices.length > 0) {
      const filtered = devices.filter(device => 
        device.nombre.toLowerCase().includes(deviceSearch.toLowerCase()) ||
        device.ubicacion.toLowerCase().includes(deviceSearch.toLowerCase()) ||
        device.categoria.toLowerCase().includes(deviceSearch.toLowerCase())
      );
      setFilteredDevices(filtered);
    }
  }, [devices, deviceSearch]);

  useEffect(() => {
    const handleScroll = () => {
      if (deviceListRef.current) {
        setIsScrolled(deviceListRef.current.scrollTop > 0);
      }
    };

    const currentDeviceList = deviceListRef.current;
    if (currentDeviceList) {
      currentDeviceList.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentDeviceList) {
        currentDeviceList.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleBackToInstallations = useCallback(() => {
    setViewingDevices(false);
    setSelectedInstallationForDevice(null);
    setDeviceSearch('');
    setIsScrolled(false);
    
    localStorage.removeItem('viewingDevices');
    localStorage.removeItem('selectedInstallation');
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      if (viewingDevices) {
        event.preventDefault();
        handleBackToInstallations();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [viewingDevices, handleBackToInstallations]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (viewingDevices && url !== router.asPath) {
        router.events.emit('routeChangeError');
        handleBackToInstallations();
        throw 'Abort route change. Please ignore this error.';
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [viewingDevices, router, handleBackToInstallations]);

  const handleAddDevice = (installation) => {
    setSelectedInstallationForDevice(installation);
    setDeviceModalOpen(true);
  };

  const handleViewDevices = async (installation) => {
    setViewingDevices(true);
    setSelectedInstallationForDevice(installation);
    setLoadingDevices(true);
    
    localStorage.setItem('viewingDevices', 'true');
    localStorage.setItem('selectedInstallation', JSON.stringify(installation));
    
    const fetchedDevices = await fetchDevicesFromInstallation(installation._id);
    if (!fetchedDevices.error) {
      setDevices(fetchedDevices);
      setFilteredDevices(fetchedDevices);
    } else {
      console.error("Error fetching devices:", fetchedDevices.error);
      setDevices([]);
      setFilteredDevices([]);
    }
    setLoadingDevices(false);
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
    setFilteredDevices(prevDevices => prevDevices.filter(device => device._id !== deletedDeviceId));
  };

  const handleDeviceUpdated = (updatedDevice) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device._id === updatedDevice._id ? updatedDevice : device
      )
    );
    setFilteredDevices(prevDevices => 
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

  const handleViewLastMaintenance = async (deviceId) => {
    try {
      const result = await getLastMaintenance(selectedInstallationForDevice._id, deviceId);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.pdfUrl) {
        window.open(result.pdfUrl, '_blank');
      } else {
        showConfirmation('No se encontró un PDF de mantenimiento para este dispositivo.');
      }
    } catch (error) {
      console.error('Error:', error);
      showConfirmation('Error al obtener el último mantenimiento');
    }
  };

  return (
    <div className={styles.contenedorPagina} data-theme={theme}>
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
            {isMobile ? (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.selectCategoria}
              >
                {["Todos", ...categories].map((categoria, index) => (
                  <option key={index} value={categoria}>
                    {categoria ? categoria.charAt(0).toUpperCase() + categoria.slice(1) : "Sin Categoría"}
                  </option>
                ))}
              </select>
            ) : (
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
            )}
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
        <div className={stylesDevices.contenedorDispositivos}>
          <h2 className={stylesDevices.tituloPaginasPanel}>
            Dispositivos ({selectedInstallationForDevice?.company})
          </h2>
          <button onClick={handleBackToInstallations} className={stylesDevices.botonVolver}>
            Volver a Instalaciones
          </button>
          <input
            type="text"
            value={deviceSearch}
            onChange={(e) => setDeviceSearch(e.target.value)}
            className={stylesDevices.buscadorPanel}
            placeholder="Buscar dispositivo por nombre, ubicación o categoría"
            aria-label="Buscar dispositivo"
          />
          <div 
            ref={deviceListRef}
            className={`${stylesDevices.listaDispositivos} ${isScrolled ? stylesDevices.scrolled : ''}`}
          >
            {loadingDevices ? (
              <p className={stylesDevices.loaderDispositivos}>Cargando dispositivos...</p>
            ) : filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <div key={device._id} className={stylesDevices.tarjetaProductoPanelDispositivos}>
                  <div className={stylesDevices.tarjetaContenido}>
                    <h3 className={stylesDevices.tituloDispositivo}>{device.nombre}</h3>
                    <p className={stylesDevices.ubicacionDispositivo}>Ubicación: {device.ubicacion}</p>
                    <p className={stylesDevices.categoriaDispositivo}>{device.categoria}</p>
                  </div>
                  <div className={stylesDevices.botonesEdicionEliminacion}>
                    <button 
                      onClick={() => handleViewLastMaintenance(device._id)} 
                      className={stylesDevices.botonMantenimiento}
                      title="Ver último mantenimiento"
                    >
                      <WrenchIcon size={20} />
                    </button>
                    <button onClick={() => handlePrintQR(device)} className={stylesDevices.botonImprimir} id={stylesDevices.botonImprimir}>
                      <Image
                        src="/imprimir.svg"
                        alt="Imprimir QR"
                        className={styles.iconoQR}
                        width={20}
                        height={20}
                      />
                    </button>
                    <button onClick={() => handleEditDevice(device)} className={stylesDevices.botonEditar}  id={stylesDevices.botonEditar}>
                      <Image
                        src="/editar.svg"
                        alt="Editar"
                        className={stylesDevices.iconoEditar}
                        width={20}
                        height={20}
                      />
                    </button>
                    <button onClick={() => handleDeleteDevice(device)} className={stylesDevices.botonEliminar}>
                      <Image
                        src="/eliminar.svg"
                        alt="Eliminar"
                        className={stylesDevices.iconoEliminar}
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p id={stylesDevices.sinDispositivos}>No se encontraron dispositivos para esta instalación.</p>
            )}
          </div>
        </div>
      )}

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
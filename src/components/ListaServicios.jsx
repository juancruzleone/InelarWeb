import React, { useState, useEffect } from "react";
import styles from "@/styles/ListaServicios.module.css";
import ServicioItem from "@/components/panel/ListaServicios/components/ServicioItem.jsx";
import CategoriaItem from "@/components/panel/ListaServicios/components/CategoriaItem.jsx";
import useServicios from "@/components/panel/ListaServicios/hooks/ListaServiciosEstado.jsx";
import { useTheme } from '@/components/ThemeProvider'

const ListaServicios = () => {
  const { theme } = useTheme()

  const { 
    filteredServices, 
    allServices,
    categories, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    handleCategoryClick,
    handleUpdateServiceStatus,
    statusFilter,
    setStatusFilter
  } = useServicios();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const allCategories = ["Todo", ...categories];

  return (
    <div  data-theme={theme}>
      <h2 className={styles.tituloPaginasPanel}>Servicios</h2>
      <input
        type="text"
        placeholder="Buscar servicio por nombre o dirección..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.buscadorPanel} 
        aria-label="Buscar servicios solicitados"
      />
      <div className={styles.filtroEstado}>
        <label htmlFor="statusFilter" className={styles.filtroLabel}>Filtrar por estado:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.filtroSelect}
        >
          <option value="todos">Todos</option>
          <option value="no realizado">No realizado</option>
          <option value="realizado">Realizado</option>
        </select>
      </div>
      <div className={styles.posicionSeccionProductos}>
        {isMobile ? (
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryClick(e.target.value)}
            className={styles.selectCategoria}
          >
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        ) : (
          <div className={styles.contenedorCategorias}>
            {allCategories.map((category, index) => (
              <CategoriaItem 
                key={index} 
                category={category} 
                isSelected={category === selectedCategory}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        )}

        <div className={styles.contenedorServicios}>
          {loading ? (
            <p className={styles.cargandoMensajes}>Cargando servicios...</p>
          ) : filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <ServicioItem 
                key={service._id} 
                service={service} 
                onUpdateStatus={handleUpdateServiceStatus}
              />
            ))
          ) : (
            <p className={styles.textoBuscadorPanel}>Ninguna solicitud de servicio encontrada</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaServicios;
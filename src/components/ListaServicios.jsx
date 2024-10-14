import { useState, useEffect } from "react";
import styles from "@/styles/ListaServicios.module.css";
import ServicioItem from "@/components/panel/ListaServicios/components/ServicioItem.jsx";
import CategoriaItem from "@/components/panel/ListaServicios/components/CategoriaItem.jsx";
import useServicios from "@/components/panel/ListaServicios/hooks/ListaServiciosEstado.jsx";

const ListaServicios = () => {
  const { 
    filteredServices, 
    allServices,
    categories, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    handleCategoryClick 
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

  const displayedServices = selectedCategory === "Todo" ? allServices : filteredServices;

  return (
    <>
      <h2 className={styles.tituloPaginasPanel}>Servicios</h2>
      <input
        type="text"
        placeholder="Buscar servicio por nombre o dirección..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.buscadorPanel} 
        aria-label="Search requested services"
      />
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
          ) : displayedServices && displayedServices.length > 0 ? (
            displayedServices.map((service, index) => (
              <ServicioItem key={index} service={service} />
            ))
          ) : (
            <p className={styles.textoBuscadorPanel}>Ninguna solicitud de servicio encontrada</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ListaServicios;
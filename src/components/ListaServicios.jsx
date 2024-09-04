import React from "react";
import styles from "@/styles/Home.module.css";
import ServicioItem from "@/components/panel/ListaServicios/components/ServicioItem.jsx";
import CategoriaItem from "@/components/panel/ListaServicios/components/CategoriaItem.jsx";
import useServicios from "@/components/panel/ListaServicios/hooks/ListaServiciosEstado.jsx";

const ListaServicios = () => {
  const { 
    filteredServices, 
    categories, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    handleCategoryClick 
  } = useServicios();

  return (
    <>
      <h2 className={styles.tituloPaginasPanel}>Servicios</h2>
      <input
        type="text"
        placeholder="Search service by name or address..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.buscadorPanel} 
        aria-label="Search requested services"
      />
      <div className={styles.posicionSeccionProductos}>
        <div className={styles.contenedorCategorias}>
          {categories.map((category, index) => (
            <CategoriaItem 
              key={index} 
              category={category} 
              isSelected={category === selectedCategory}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>

        <div className={styles.contenedorServicios}>
          {loading ? (
            <p>Cargando servicios...</p>
          ) : filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <ServicioItem key={index} service={service} />
            ))
          ) : (
            <p className={styles.textoBuscadorPanel}>No services found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ListaServicios;

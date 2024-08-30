import { useState, useEffect } from "react";
import { fetchServicios } from "@/components/panel/ListaServicios/services/FetchListaServicios.jsx";
import { filterServicios } from "@/components/panel/ListaServicios/utils/ListasServiciosUtils.jsx";

export default function useServicios() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getServicios = async () => {
      setLoading(true);
      try {
        const data = await fetchServicios();
        setServices(data);

        const uniqueCategories = Array.from(
          new Set(data.map((service) => service.category || "Sin Categoría"))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    getServicios();
  }, []);

  useEffect(() => {
    setFilteredServices(filterServicios(services, selectedCategory, searchTerm));
  }, [selectedCategory, services, searchTerm]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return { 
    filteredServices, 
    categories, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    handleCategoryClick 
  };
}
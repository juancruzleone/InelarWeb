import { useState, useEffect } from "react";
import { fetchServices } from "@/components/panel/ListaServicios/services/FetchListaServicios.jsx";
import { filterServices } from "@/components/panel/ListaServicios/utils/ListasServiciosUtils.jsx";

export default function useServicios() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getServices = async () => {
      setLoading(true);
      try {
        const data = await fetchServices();
        setServices(data);

        const uniqueCategories = Array.from(
          new Set(data.map((service) => service.category || "Uncategorized"))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  useEffect(() => {
    setFilteredServices(filterServices(services, selectedCategory, searchTerm));
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

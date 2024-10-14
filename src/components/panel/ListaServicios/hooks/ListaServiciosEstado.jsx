import { useState, useEffect } from "react";
import { fetchServices } from "@/components/panel/ListaServicios/services/FetchListaServicios.jsx";
import { filterServices } from "@/components/panel/ListaServicios/utils/ListasServiciosUtils.jsx";

export default function useServicios() {
  const [allServices, setAllServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getServices = async () => {
      setLoading(true);
      try {
        const data = await fetchServices();
        setAllServices(data);

        const uniqueCategories = Array.from(
          new Set(data.map((service) => service.category || "Uncategorized"))
        );
        setCategories(uniqueCategories);
        setFilteredServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setAllServices([]);
        setFilteredServices([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  useEffect(() => {
    if (selectedCategory === "Todo") {
      setFilteredServices(allServices);
    } else {
      setFilteredServices(filterServices(allServices, selectedCategory, searchTerm));
    }
  }, [selectedCategory, allServices, searchTerm]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return { 
    filteredServices, 
    allServices,
    categories, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    handleCategoryClick 
  };
}
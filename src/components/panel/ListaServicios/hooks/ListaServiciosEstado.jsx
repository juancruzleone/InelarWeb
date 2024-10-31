import { useState, useEffect, useCallback } from "react";
import { fetchServices, updateServiceStatus } from "@/components/panel/ListaServicios/services/FetchListaServicios.jsx";

export default function useServicios() {
  const [allServices, setAllServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

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

  const applyFilters = useCallback(() => {
    let filtered = allServices;

    // Aplicar filtro de categoría
    if (selectedCategory !== "Todo") {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Aplicar filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (service.direccion && service.direccion.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Aplicar filtro de estado
    if (statusFilter !== "todos") {
      filtered = filtered.filter(service => service.estado === statusFilter);
    }

    setFilteredServices(filtered);
  }, [allServices, selectedCategory, searchTerm, statusFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleUpdateServiceStatus = async (serviceId) => {
    try {
      const updatedService = await updateServiceStatus(serviceId, 'realizado');
      
      const updatedServices = allServices.map(service => 
        service._id === serviceId ? { ...service, ...updatedService } : service
      );
      
      setAllServices(updatedServices);
      applyFilters();
      
      return true;
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      return false;
    }
  };

  return { 
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
  };
}
export function filterServicios(services, selectedCategory, searchTerm) {
    return services.filter(service => {
      const matchesCategory = selectedCategory === null || service.category === selectedCategory;
      const matchesSearch = 
        service.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.direccion.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
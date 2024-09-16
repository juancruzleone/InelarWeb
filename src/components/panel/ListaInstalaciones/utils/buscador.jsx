export const searchInstallations = (selectedCategory, searchTerm, installations) => {
  if (!Array.isArray(installations)) {
    return [];
  }

  return installations.filter(installation => {
    if (!installation || typeof installation !== 'object') {
      return false;
    }

    const matchesCategory =
      selectedCategory === "Todos" || installation.installationType === selectedCategory;
    
    const matchesSearchTerm = installation.company 
      ? installation.company.toLowerCase().includes(searchTerm.toLowerCase())
      : false;

    return matchesCategory && matchesSearchTerm;
  });
};
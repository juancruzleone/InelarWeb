const filterClients = (clients, search, selectedCategory) => {
  return clients.filter((client) => {
    const matchesName = client.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || client.category === selectedCategory;

    return matchesName && matchesCategory;
  });
};

export default filterClients;

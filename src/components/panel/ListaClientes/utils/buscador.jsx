const filtrarClientes = (clientes, buscar, categoriaSeleccionada) => {
  return clientes.filter((cliente) => {
    const coincideNombre = cliente.name
      .toLowerCase()
      .includes(buscar.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === "Todos" ||
      cliente.category === categoriaSeleccionada;

    return coincideNombre && coincideCategoria;
  });
};

export default filtrarClientes;

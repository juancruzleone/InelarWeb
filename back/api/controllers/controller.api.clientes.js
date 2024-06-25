import * as service from "../../services/clientes.services.js";

const obtenerClientes = (req, res) => {
  const filter = req.query;
  service.obtenerClientes(filter).then((clientes) => {
    res.status(200).json(clientes);
  });
};

const obtenerClienteById = (req, res) => {
  const id = req.params.id;
  service.obtenerClienteById(id).then((cliente) => {
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json();
    }
  });
};

const agregarCliente = async (req, res) => {
  try {
    const clienteNuevo = await service.crearCliente(req.body);
    res.status(201).json(clienteNuevo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const reemplazarCliente = async (req, res) => {
  const id = req.params.id;
  const cliente = {
    name: req.body.name,
    category: req.body.category,
    // Otros campos según tu modelo
  };

  try {
    const clienteEditado = await service.reemplazarCliente(id, cliente);
    if (clienteEditado.modifiedCount > 0) {
      res.status(200).json(clienteEditado.value);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const actualizarCliente = async (req, res) => {
  const id = req.params.id;
  try {
    const clienteEditado = await service.editarCliente(id, req.body);
    if (clienteEditado.modifiedCount > 0) {
      res.status(200).json(clienteEditado.value);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const eliminarCliente = async (req, res) => {
  const id = req.params.id;
  try {
    await service.eliminarCliente(id);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export {
  obtenerClientes,
  obtenerClienteById,
  agregarCliente,
  actualizarCliente,
  reemplazarCliente,
  eliminarCliente,
};

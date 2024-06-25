import * as service from "../../services/productos.services.js";

const getProductos = (req, res) => {
  const filter = req.query;

  service.getProductos(filter).then((productos) => {
    res.status(200).json(productos);
  });
};

const getProductoById = (req, res) => {
  const id = req.params.id;
  service.getProductobyId(id).then((producto) => {
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json();
    }
  });
};

const agregarProducto = async (req, res) => {
  try {
    const producto = { ...req.body, imagen: `/${req.file.filename}` };
    const productoNuevo = await service.createProducto(producto);
    res.status(201).json(productoNuevo);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const remplazarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = { ...req.body };
    if (req.file) {
      producto.imagen = `/${req.file.filename}`;
    }
    const productoEditado = await service.remplazarProducto(id, producto);
    if (productoEditado.modifiedCount > 0) {
      res.status(200).json(producto);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    console.error('Error al reemplazar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = { ...req.body };
    if (req.file) {
      producto.imagen = `/${req.file.filename}`;
    }
    const productoEditado = await service.editProducto(id, producto);
    if (productoEditado.modifiedCount > 0) {
      res.status(200).json(producto);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const eliminarProducto = (req, res) => {
  const id = req.params.id;
  service.eliminarProducto(id)
    .then(() => {
      res.status(204).json();
    })
    .catch((error) => {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};

export {
  getProductos,
  getProductoById,
  agregarProducto,
  actualizarProducto,
  remplazarProducto,
  eliminarProducto,
};

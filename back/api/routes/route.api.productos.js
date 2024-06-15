import { Router } from 'express';
import multer from 'multer';
import * as controllers from '../controllers/controller.api.productos.js';
import { validateProducto, validateProductoPatch } from '../../middleware/producto.validate.middleware.js';
import fs from 'fs';

const route = Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = '../front/public'; // Ajusta el path de destino
    // Verificar si el directorio existe, si no existe, crearlo
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

route.get('/productos', controllers.getProductos);
route.get('/productos/:id', controllers.getProductoById);

route.all('/productos/:id', function todos(req, res, next) {
  console.log("tengo un rol valido");
  next();
});

route.post('/productos', upload.single('imagen'), validateProducto, controllers.agregarProducto);
route.put('/productos/:id', upload.single('imagen'), validateProducto, controllers.remplazarProducto);
route.patch('/productos/:id', upload.single('imagen'), validateProductoPatch, controllers.actualizarProducto);
route.delete("/productos/:id", controllers.eliminarProducto);

export default route;
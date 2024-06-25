import { Router } from 'express';
import * as controllers from '../controllers/controller.api.clientes.js';
import { validateCliente, validateClientePatch } from '../../middleware/clientes.validate.middleware.js';

const route = Router();

// Traer todos los clientes
route.get('/clientes', controllers.obtenerClientes);

// Traer un cliente específico
route.get('/clientes/:id', controllers.obtenerClienteById);

// Agregar un cliente
route.post('/clientes', [validateCliente], controllers.agregarCliente);

// Remplazar un cliente -> PUT
route.put('/clientes/:id', [validateCliente], controllers.reemplazarCliente);

// Actualizar un cliente -> PATCH
route.patch('/clientes/:id', [validateClientePatch], controllers.actualizarCliente);

// Eliminar un cliente
route.delete('/clientes/:id', controllers.eliminarCliente);

export default route;

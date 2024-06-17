import { Router } from 'express';
import { getAllOrders } from '../controllers/controller.api.order.js';

const router = Router();

router.get('/orders', getAllOrders); // Obtener todas las órdenes

export default router;

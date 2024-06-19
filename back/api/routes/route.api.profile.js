import { Router } from 'express';
import * as controllers from '../controllers/controller.api.profile.js';

const route = Router();

// Edit profile
route.put('/cuenta/profile', controllers.editarPerfil);

export default route;

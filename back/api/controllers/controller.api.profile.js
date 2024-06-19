import * as services from '../../services/profile.services.js';
import { validarToken } from '../../services/token.service.js';

async function editarPerfil(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: { message: 'Authorization header missing' } });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = await validarToken(token);
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid or expired token' } });
    }

    const { userName } = req.body;

    try {
      await services.editarPerfil(user._id, userName);
      res.status(200).json({ message: 'Perfil actualizado correctamente' });
    } catch (err) {
      res.status(400).json({ error: { message: err.message } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: 'Server error' } });
  }
}

export { editarPerfil };

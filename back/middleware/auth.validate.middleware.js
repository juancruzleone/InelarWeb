import * as cuentaSchema from '../schemas/auth.schema.js';

async function validarCuenta(req, res, next) {
    try {
        // Validar el esquema usando Yup
        const cuenta = await cuentaSchema.cuenta.validate(req.body, { abortEarly: false, stripUnknown: true });
        req.body = cuenta;
        next();
    } catch (err) {
        const errorMessages = err.inner.map(e => e.message);
        res.status(400).json({ error: { message: 'Validation error', details: errorMessages } });
    }
}

export { validarCuenta };

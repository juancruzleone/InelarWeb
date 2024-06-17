import { MercadoPagoConfig, Preference } from 'mercadopago';

const createOrder = async (req, res) => {
    try {
        const { carrito, estado } = req.body;

        if (estado === 'procesando') {
            return res.status(400).json({ error: 'Ya se está procesando una orden.' });
        }

        const client = new MercadoPagoConfig({ accessToken: "APP_USR-4052031476279541-061615-b619da07aaa484257152a2fe9b485ce3-1861901310" });
        const preference = new Preference(client);

        const items = carrito.map(producto => ({
            title: producto.nombre,
            unit_price: parseFloat(producto.precio),
            currency_id: "ARS",
            quantity: producto.unidades  // Ajustado para incluir la cantidad correcta
        }));

        const preferenceBody = {
            items,
            back_urls: {
                success: "http://localhost:3000/carrito?status=success",
                failure: "http://localhost:3000/carrito?status=failure",
                pending: "http://localhost:3000/carrito?status=pending"
            },
            auto_return: "approved"
        };

        const result = await preference.create({ body: preferenceBody });
        res.status(200).json({ ...result, estado: 'procesando' });
    } catch (error) {
        console.error('Error creating preference:', error);
        res.status(500).json({ error: error.message });
    }
};

export {
    createOrder
};

import { MercadoPagoConfig, Preference } from 'mercadopago';

const createOrder = async (req, res) => {
    try {
        // Configuración de Mercado Pago
        const client = new MercadoPagoConfig({ accessToken: "APP_USR-4052031476279541-061615-b619da07aaa484257152a2fe9b485ce3-1861901310" });
        const preference = new Preference(client);

        const carrito = req.body.carrito;

        const items = carrito.map(producto => ({
            title: producto.nombre,
            unit_price: parseFloat(producto.precio),
            currency_id: "ARS",
            quantity: 1
        }));

        const preferenceBody = {
            items,
            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending"
            },
            auto_return: "approved"
        };

        const result = await preference.create({ body: preferenceBody });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating preference:', error);
        res.status(500).json({ error: error.message });
    }
};

export {
    createOrder
};

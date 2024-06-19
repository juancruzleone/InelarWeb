import express from "express";
import ApiProductoRoutes from '../api/routes/route.api.productos.js';
import ApiClientesRoutes from '../api/routes/route.api.clientes.js';
import ApiContactRoutes from '../api/routes/route.api.contactos.js';
import ApiServicesRoutes from '../api/routes/route.api.servicios.js';
import ApiCheckoutRoutes from '../api/routes/route.api.checkout.js';
import ApiOrdersRoutes from '../api/routes/route.api.order.js';
import ApiProfileRoutes from '../api/routes/route.api.profile.js'
import ApiAuthRoutes from '../api/routes/route.api.auth.js';


import cors from 'cors';

const app = express(); //el servidor

app.use(express.urlencoded({ extended: true })); //middleware
app.use("/", express.static("public"));
app.use(express.json());                         //middleware
app.use(cors());


app.use('/api', ApiProductoRoutes);
app.use('/api', ApiClientesRoutes);
app.use("/api", ApiContactRoutes);
app.use("/api", ApiServicesRoutes);
app.use("/api", ApiCheckoutRoutes);
app.use('/api', ApiOrdersRoutes);
app.use('/api', ApiProfileRoutes);
app.use('/api', ApiAuthRoutes);

app.listen(2023);

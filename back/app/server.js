import express from "express";
import ProductoRoutes from '../routes/productos.routes.js'
import ApiProductoRoutes from '../api/routes/route.api.productos.js'
import ApiClientesRoutes from '../api/routes/route.api.clientes.js'
import ApiContactRoutes from '../api/routes/route.api.contactos.js'
import ApiServicesRoutes from '../api/routes/route.api.servicios.js'
import ApiCheckoutRoutes from '../api/routes/route.api.checkout.js'
import ApiAuthRoutes from '../api/routes/route.api.auth.js'

import cors from 'cors' 

const app = express(); //el servidor


app.use(express.urlencoded({ extended: true })); //midleware
app.use("/", express.static("public"));
app.use(express.json());                         //midleware
app.use(cors())

app.use(ProductoRoutes)
app.use('/api', ApiProductoRoutes)
app.use('/api', ApiClientesRoutes)
app.use("/api", ApiContactRoutes);
app.use("/api", ApiServicesRoutes)
app.use("/api", ApiCheckoutRoutes)
app.use('/api', ApiAuthRoutes)

app.listen(2023);

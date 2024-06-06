import { productoSchemaCreate, productoSchemaPatch } from '../schemas/producto.schema.js'

function validateProducto(req, res, next){
    productoSchemaCreate.validate(req.body,{ abortEarly: false })
        .then( (producto) => {
            req.body = producto
            next()
        } )
        .catch((error) => res.status(500).json(error))
}

function validateProductoPatch(req, res, next){
    productoSchemaPatch.validate(req.body,{ abortEarly: false, stripUnknown: true })
        .then( (producto) => {
            req.body = producto
            next()
        } )
        .catch((error) => res.status(500).json(error))
}

export {
    validateProducto,
    validateProductoPatch
}
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb+srv://juan:juan123@proyectoinelar.2eadspu.mongodb.net/');
await client.connect();
const db = client.db("inelar");

async function obtenerClientes(filter = {}) {
  const filterMongo = { eliminado: { $ne: true } };
  return db.collection("clientes").find(filterMongo).toArray();
}

async function obtenerClienteById(id) {
  return db.collection("clientes").findOne({ _id: new ObjectId(id) });
}

const crearCliente = async (cliente) => {
  const clienteInsertado = await db.collection("clientes").insertOne(cliente);
  cliente._id = clienteInsertado.insertedId;
  return cliente;
};

const reemplazarCliente = async (id, cliente) => {
  const clienteEditado = await db.collection("clientes").replaceOne({ _id: new ObjectId(id) }, cliente);
  return clienteEditado;
};

const editarCliente = async (id, nuevoCliente) => {
  const clienteEditado = await db.collection("clientes").updateOne(
    { _id: new ObjectId(id) },
    { $set: nuevoCliente }
  );
  return clienteEditado;
};

const eliminarCliente = async (id) => {
  const clienteEliminado = await db.collection("clientes").deleteOne({ _id: new ObjectId(id) });
  return clienteEliminado;
};

export {
  obtenerClientes,
  obtenerClienteById,
  crearCliente,
  reemplazarCliente,
  editarCliente,
  eliminarCliente,
};

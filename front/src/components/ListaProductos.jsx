import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

// Configurar react-modal
Modal.setAppElement("#__next");

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({ name: "", description: "" });

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch("http://localhost:2023/api/productos");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  const handleEditarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setModalEditar(true);
  };

  const handleEliminarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setModalEliminar(true);
  };

  const handleAbrirModalCrear = () => {
    setNuevoProducto({ name: "", description: "" });
    setModalCrear(true);
  };

  const handleCerrarModal = () => {
    setModalEditar(false);
    setModalEliminar(false);
    setModalCrear(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (modalCrear) {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    } else {
      setProductoSeleccionado({ ...productoSeleccionado, [name]: value });
    }
  };

  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    // Implementa la lógica para editar el producto
    console.log("Producto editado:", productoSeleccionado);
    handleCerrarModal();
  };

  const handleSubmitEliminar = async () => {
    // Implementa la lógica para eliminar el producto
    console.log("Producto eliminado:", productoSeleccionado);
    handleCerrarModal();
  };

  const handleSubmitCrear = async (e) => {
    e.preventDefault();
    // Implementa la lógica para crear el producto
    console.log("Producto creado:", nuevoProducto);
    handleCerrarModal();
  };

  return (
    <div>
      <div className={styles.contenedorPagina}>
        <h1 className={styles.tituloPaginasPanel}>Productos</h1>
        <button onClick={handleAbrirModalCrear} id={styles.botonCrearProducto}>Crear Producto</button>
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorProductosPanel}>
            {productos.map((producto, index) => (
              <div key={index} className={styles.tarjetaProductoPanel}>
                <h3>{producto.name}</h3>
                <div>
                  <button onClick={() => handleEditarProducto(producto)}>Editar</button>
                  <button onClick={() => handleEliminarProducto(producto)} className={styles.botonEliminar}>
                    <Image src="/eliminar.png" alt="Eliminar" width={10} height={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Editar */}
      <Modal
        isOpen={modalEditar}
        onRequestClose={handleCerrarModal}
        contentLabel="Editar Producto"
        className={styles.Modal}
      >
        <h2>Editar Producto</h2>
        {productoSeleccionado && (
          <form onSubmit={handleSubmitEditar}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productoSeleccionado.name}
              onChange={handleChange}
            />
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={productoSeleccionado.description}
              onChange={handleChange}
            />
            <button type="submit">Guardar</button>
          </form>
        )}
      </Modal>

      {/* Modal Eliminar */}
      <Modal
        isOpen={modalEliminar}
        onRequestClose={handleCerrarModal}
        contentLabel="Eliminar Producto"
        className={styles.Modal}
      >
        <h2>Eliminar Producto</h2>
        <p>¿Estás seguro de eliminar el producto {productoSeleccionado?.name}?</p>
        <button onClick={handleSubmitEliminar}>Eliminar</button>
        <button onClick={handleCerrarModal}>Cancelar</button>
      </Modal>

      {/* Modal Crear */}
      <Modal
        isOpen={modalCrear}
        onRequestClose={handleCerrarModal}
        contentLabel="Crear Producto"
        className={styles.Modal}
      >
        <h2>Crear Producto</h2>
        <form onSubmit={handleSubmitCrear}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nuevoProducto.name}
            onChange={handleChange}
          />
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={nuevoProducto.description}
            onChange={handleChange}
          />
          <button type="submit">Crear</button>
        </form>
      </Modal>
    </div>
  );
};

export default ListaProductos;

import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

// Configurar react-modal
Modal.setAppElement("#__next");

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({ name: "", category: "", description: "", price: "" });

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await fetch("http://localhost:2023/api/clientes");
        const data = await response.json();

        setClientes(data);

        // Obtener las categorías únicas de los clientes
        const categoriasUnicas = Array.from(
          new Set(data.map((cliente) => cliente.category || "Sin Categoría"))
        );
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };

    obtenerClientes();
  }, []);

  useEffect(() => {
    // Filtrar los clientes según la categoría seleccionada
    if (categoriaSeleccionada === null) {
      setClientesFiltrados(clientes);
    } else {
      const clientesFiltrados = clientes.filter(
        (cliente) => cliente.category === categoriaSeleccionada
      );
      setClientesFiltrados(clientesFiltrados);
    }
  }, [categoriaSeleccionada, clientes]);

  const handleClickCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleCrearCliente = () => {
    setModalCrear(true);
  };

  const handleEditarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEditar(true);
  };

  const handleEliminarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEliminar(true);
  };

  const handleCerrarModal = () => {
    setModalCrear(false);
    setModalEditar(false);
    setModalEliminar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (modalCrear) {
      setNuevoCliente({ ...nuevoCliente, [name]: value });
    } else if (modalEditar) {
      setClienteSeleccionado({ ...clienteSeleccionado, [name]: value });
    }
  };

  const handleSubmitCrear = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2023/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCliente),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const createdCliente = await response.json();
      setClientes([...clientes, createdCliente]);
      handleCerrarModal();
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:2023/api/clientes/${clienteSeleccionado._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteSeleccionado),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      console.log("Cliente editado:", clienteSeleccionado);
      handleCerrarModal();
      obtenerClientes(); // Actualizar lista de clientes después de la edición
    } catch (error) {
      console.error("Error al editar cliente:", error);
    }
  };

  const handleSubmitEliminar = async () => {
    try {
      const response = await fetch(`http://localhost:2023/api/clientes/${clienteSeleccionado._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      console.log("Cliente eliminado:", clienteSeleccionado);
      handleCerrarModal();
      obtenerClientes(); // Actualizar lista de clientes después de la eliminación
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    <div>
      <div className={styles.contenedorPagina}>
        <h1 className={styles.tituloPaginasPanel}>Clientes</h1>
        <button onClick={() => handleCrearCliente()} className={styles.botonCrearProducto}>Crear</button>
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorCategorias}>
            {/* Lista de categorías como contenedores */}
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className={`${styles.contenedorCategoria} ${
                  categoria === categoriaSeleccionada
                    ? styles.categoriaSeleccionada
                    : ""
                }`}
                onClick={() => handleClickCategoria(categoria)}
              >
                <p>{categoria}</p>
              </div>
            ))}
          </div>

          {/* Lista de clientes filtrada por categoría */}
          <div className={styles.contenedorClientes}>
            {clientesFiltrados.map((cliente, index) => (
              <div key={index} className={styles.tarjetaProductoPanel}>
                <h3>{cliente.name}</h3>
                <div>
                  <button onClick={() => handleEditarCliente(cliente)}>Editar</button>
                  <button onClick={() => handleEliminarCliente(cliente)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Crear */}
      <Modal
        isOpen={modalCrear}
        onRequestClose={handleCerrarModal}
        contentLabel="Crear Cliente"
        className={styles.ModalPanel}
      >
        <h2>Crear Cliente</h2>
        <form onSubmit={handleSubmitCrear} className={styles.formularioPanel}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nuevoCliente.name}
            onChange={handleChange}
          />
          <label htmlFor="category">Categoría:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={nuevoCliente.category}
            onChange={handleChange}
          />
          <button type="submit">Crear</button>
        </form>
      </Modal>

      {/* Modal Editar */}
      <Modal
        isOpen={modalEditar}
        onRequestClose={handleCerrarModal}
        contentLabel="Editar Cliente"
        className={styles.Modal}
      >
        <h2>Editar Cliente</h2>
        {clienteSeleccionado && (
          <form onSubmit={handleSubmitEditar} className={styles.formularioPanel}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={clienteSeleccionado.name}
              onChange={handleChange}
            />
            <label htmlFor="category">Categoría:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={clienteSeleccionado.category}
              onChange={handleChange}
            />
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={clienteSeleccionado.description}
              onChange={handleChange}
            />
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={clienteSeleccionado.price}
              onChange={handleChange}
            />
            <label htmlFor="imagen">Imagen:</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={clienteSeleccionado.imagen}
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
        contentLabel="Eliminar Cliente"
        className={styles.Modal}
      >
        <h2>Eliminar Cliente</h2>
        <p>¿Estás seguro de eliminar el cliente {clienteSeleccionado?.name}?</p>
        <div className={styles.contenedorEliminar}>
          <button onClick={handleSubmitEliminar} className={styles.botonEliminarModal}>Eliminar</button>
          <button onClick={handleCerrarModal} className={styles.botonCancelarModal}>Cancelar</button>
        </div>

      </Modal>
    </div>
  );
};

export default ListaClientes;
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

// Configurar react-modal
Modal.setAppElement("#__next");

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({ name: "", categoria: "", description: "", price: "", imagen: "" });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch("http://localhost:2023/api/productos");
        const data = await response.json();

        setProductos(data);

        // Obtener las categorías únicas de los productos, excluyendo los productos sin categoría
        const categoriasUnicas = Array.from(
          new Set(data.map((producto) => producto.categoria))
        ).filter(categoria => categoria !== undefined && categoria !== "");
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    filtrarProductos();
  }, [categoriaSeleccionada, productos, busqueda]);

  const filtrarProductos = () => {
    let productosFiltrados = productos;

    if (categoriaSeleccionada) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      );
    }

    if (busqueda) {
      productosFiltrados = productosFiltrados.filter((producto) =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setProductosFiltrados(productosFiltrados);
  };

  const handleClickCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleCrearProducto = () => {
    setModalCrear(true);
  };

  const handleEditarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setModalEditar(true);
  };

  const handleEliminarProducto = (producto) => {
    setProductoSeleccionado(producto);
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
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    } else if (modalEditar) {
      setProductoSeleccionado({ ...productoSeleccionado, [name]: value });
    }
  };

  const handleSubmitCrear = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2023/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const createdProducto = await response.json();
      setProductos([...productos, createdProducto]);
      handleCerrarModal();
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:2023/api/productos/${productoSeleccionado._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoSeleccionado),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      console.log("Producto editado:", productoSeleccionado);
      handleCerrarModal();
      obtenerProductos(); // Actualizar lista de productos después de la edición
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  };

  const handleSubmitEliminar = async () => {
    try {
      const response = await fetch(`http://localhost:2023/api/productos/${productoSeleccionado._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      console.log("Producto eliminado:", productoSeleccionado);
      handleCerrarModal();
      obtenerProductos(); // Actualizar lista de productos después de la eliminación
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const capitalizarPrimeraLetra = (cadena) => {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
  };

  return (
    <div>
      <div className={styles.contenedorPagina}>
        <h1 className={styles.tituloPaginasPanel}>Productos</h1>
        <button onClick={handleCrearProducto} className={styles.botonCrearModal}>Crear Producto</button>
        <input
          type="text"
          className={styles.buscadorPanel}
          placeholder="Busca el nombre del producto"
          value={busqueda}
          onChange={handleBusqueda}
        />
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
                <p>{capitalizarPrimeraLetra(categoria)}</p>
              </div>
            ))}
          </div>

          {/* Lista de productos filtrada por categoría */}
          <div className={styles.contenedorClientes}>
            {productosFiltrados.map((producto, index) => (
              <div key={index} className={styles.tarjetaProductoPanelProductos}>
                <h3>{producto.name}</h3>
                <div>
                  <button onClick={() => handleEditarProducto(producto)} className={styles.botonEditar}>
                    <Image src="/editar.png" alt="Editar" width={10} height={10} />
                  </button>
                  <button onClick={() => handleEliminarProducto(producto)} className={styles.botonEliminar}>
                    <Image src="/eliminar.png" alt="Eliminar" width={10} height={10} />
                  </button>
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
        contentLabel="Crear Producto"
        className={styles.ModalPanel}
      >
        <h2>Crear Producto</h2>
        <form onSubmit={handleSubmitCrear} className={styles.formularioPanel}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nuevoProducto.name}
            onChange={handleChange}
          />
          <label htmlFor="categoria">Categoría:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={nuevoProducto.categoria}
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
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={nuevoProducto.price}
            onChange={handleChange}
          />
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={nuevoProducto.imagen}
            onChange={handleChange}
          />
          <button type="submit">Crear</button>
        </form>
      </Modal>

      {/* Modal Editar */}
      <Modal
        isOpen={modalEditar}
        onRequestClose={handleCerrarModal}
        contentLabel="Editar Producto"
        className={styles.Modal}
      >
        <h2>Editar Producto</h2>
        {productoSeleccionado && (
          <form onSubmit={handleSubmitEditar} className={styles.formularioPanel}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productoSeleccionado.name}
              onChange={handleChange}
            />
            <label htmlFor="categoria">Categoría:</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={productoSeleccionado.categoria}
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
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productoSeleccionado.price}
              onChange={handleChange}
            />
            <label htmlFor="imagen">Imagen:</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={productoSeleccionado.imagen}
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
        {productoSeleccionado && (
          <div>
            <p>¿Estás seguro de que deseas eliminar el producto {productoSeleccionado.name}?</p>
            <button onClick={handleSubmitEliminar}>Eliminar</button>
            <button onClick={handleCerrarModal}>Cancelar</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListaProductos;

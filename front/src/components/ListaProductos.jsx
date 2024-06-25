import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

// Configuring react-modal
Modal.setAppElement("#__next");

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalNotificacion, setModalNotificacion] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({ name: "", categoria: "", description: "", price: "", imagen: null });
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
        
        // Inicializar productosFiltrados con la lista completa de productos
        setProductosFiltrados(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    filtrarProductos();
  }, [categoriaSeleccionada, productos, busqueda]);

  useEffect(() => {
    if (modalNotificacion) {
      const timer = setTimeout(() => {
        setModalNotificacion(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalNotificacion]);

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
    setNuevoProducto({ name: "", categoria: "", description: "", price: "", imagen: null });
    setProductoSeleccionado(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (modalCrear) {
      if (name === "imagen") {
        setNuevoProducto({ ...nuevoProducto, imagen: e.target.files[0] });
      } else {
        setNuevoProducto({ ...nuevoProducto, [name]: value });
      }
    } else if (modalEditar) {
      if (name === "imagen") {
        setProductoSeleccionado({ ...productoSeleccionado, imagen: e.target.files[0] });
      } else {
        setProductoSeleccionado({ ...productoSeleccionado, [name]: value });
      }
    }
  };

  const handleSubmitCrear = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nuevoProducto.name);
    formData.append("categoria", nuevoProducto.categoria);
    formData.append("description", nuevoProducto.description);
    formData.append("price", nuevoProducto.price);
    if (nuevoProducto.imagen) {
      formData.append("imagen", nuevoProducto.imagen);
    }
    try {
      const response = await fetch("http://localhost:2023/api/productos", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const productoCreado = await response.json();
        setProductos([...productos, productoCreado]);
        setModalCrear(false);
        setNuevoProducto({ name: "", categoria: "", description: "", price: "", imagen: null });
        setMensajeNotificacion("Producto creado exitosamente.");
        setModalNotificacion(true);
        obtenerProductos(); // Actualizar lista de productos después de la creación
      } else {
        console.error("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productoSeleccionado.name);
    formData.append("categoria", productoSeleccionado.categoria);
    formData.append("description", productoSeleccionado.description);
    formData.append("price", productoSeleccionado.price);
    if (productoSeleccionado.imagen instanceof File) {
      formData.append("imagen", productoSeleccionado.imagen);
    }
    try {
      const response = await fetch(`http://localhost:2023/api/productos/${productoSeleccionado._id}`, {
        method: "PATCH",
        body: formData,
      });
      if (response.ok) {
        const productoActualizado = await response.json();
        setProductos(
          productos.map((producto) =>
            producto._id === productoActualizado._id ? productoActualizado : producto
          )
        );
        setModalEditar(false);
        setProductoSeleccionado(null);
        setMensajeNotificacion("Producto editado exitosamente.");
        setModalNotificacion(true);
      } else {
        console.error("Error al editar el producto");
      }
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  const handleSubmitEliminar = async () => {
    try {
      const response = await fetch(`http://localhost:2023/api/productos/${productoSeleccionado._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProductos(
          productos.filter((producto) => producto._id !== productoSeleccionado._id)
        );
        setModalEliminar(false);
        setProductoSeleccionado(null);
        setMensajeNotificacion("Producto eliminado exitosamente.");
        setModalNotificacion(true);
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
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
                    <Image src="/editar.svg" alt="Editar" width={10} height={10} />
                  </button>
                  <button onClick={() => handleEliminarProducto(producto)} className={styles.botonEliminar}>
                    <Image src="/eliminar.svg" alt="Eliminar" width={10} height={10} />
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
            required
          />
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={nuevoProducto.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={nuevoProducto.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={nuevoProducto.price}
            onChange={handleChange}
            required
          />
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleChange}
            required
          />
          <button type="submit">Crear</button>
        </form>
      </Modal>

      {/* Modal Editar */}
      <Modal
        isOpen={modalEditar}
        onRequestClose={handleCerrarModal}
        contentLabel="Editar Producto"
        className={styles.ModalPanel}
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
              required
            />
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              name="categoria"
              value={productoSeleccionado.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria}>{categoria}</option>
              ))}
            </select>
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={productoSeleccionado.description}
              onChange={handleChange}
              required
            />
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productoSeleccionado.price}
              onChange={handleChange}
              required
            />
            <label htmlFor="imagen">Imagen:</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleChange}
            />
            <button type="submit">Guardar Cambios</button>
          </form>
        )}
      </Modal>

      {/* Modal Eliminar */}
      <Modal
        isOpen={modalEliminar}
        onRequestClose={handleCerrarModal}
        contentLabel="Eliminar Producto"
        className={styles.ModalPanelEditar}
      >
        <h2>Eliminar Producto</h2>
        {productoSeleccionado && (
          <>
            <p className={styles.textoPanelModalEliminar}>¿Estás seguro de que deseas eliminar el producto {productoSeleccionado.name}?</p>
            <div className={styles.contenedorBotonesPanelEliminar}>
              <button onClick={handleSubmitEliminar} className={styles.botonModalEliminar}>Eliminar</button>
              <button onClick={handleCerrarModal} className={styles.botonModalCancelar}>Cancelar</button>
            </div>
          </>
        )}
      </Modal>

      {/* Modal Notificación */}
      <Modal
        isOpen={modalNotificacion}
        contentLabel="Notificación"
        className={styles.Modal}
      >
        <h2>{mensajeNotificacion}</h2>
      </Modal>
    </div>
  );
};

export default ListaProductos;

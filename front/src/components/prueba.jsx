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
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({ name: "", categoria: "", description: "", price: "", imagen: null });
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    filtrarProductos();
  }, [categoriaSeleccionada, busqueda, productos]);

  const obtenerProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:2023/api/productos");
      const data = await response.json();
      setProductos(data);
      const categoriasUnicas = Array.from(
        new Set(data.map((producto) => producto.categoria))
      ).filter(categoria => categoria !== undefined && categoria !== "");
      setCategorias(categoriasUnicas);
      setProductosFiltrados(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarProductos = () => {
    let productosFiltrados = productos;

    if (categoriaSeleccionada) {
      productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoriaSeleccionada);
    }

    if (busqueda) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setProductosFiltrados(productosFiltrados);
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
      mostrarConfirmacion("Producto creado exitosamente");
      obtenerProductos(); // Actualizar lista de productos después de la creación
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
      const updatedProducto = await response.json();
      setProductos(
        productos.map((producto) =>
          producto._id === updatedProducto._id ? updatedProducto : producto
        )
      );
      handleCerrarModal();
      mostrarConfirmacion("Producto editado exitosamente");
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
      setProductos(productos.filter(producto => producto._id !== productoSeleccionado._id));
      handleCerrarModal();
      mostrarConfirmacion("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const mostrarConfirmacion = (mensaje) => {
    setMensajeConfirmacion(mensaje);
    setModalConfirmacion(true);
    setTimeout(() => {
      setModalConfirmacion(false);
    }, 3000);
  };

  return (
    <div>
      <div className={styles.contenedorPagina}>
        <h1 className={styles.tituloPaginasPanel}>Productos</h1>
        <button onClick={handleCrearProducto} className={styles.botonCrearModal}>Crear Producto</button>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.buscadorPanel}
          placeholder='Busca el nombre del producto'
        />
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorCategorias}>
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className={`${styles.contenedorCategoria} ${
                  categoria === categoriaSeleccionada
                    ? styles.categoriaSeleccionada
                    : ""
                }`}
                onClick={() => setCategoriaSeleccionada(categoria)}
              >
                <p>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</p>
              </div>
            ))}
          </div>
          <div className={styles.contenedorClientes}>
            {loading ? (
              <p>Cargando productos...</p>
            ) : (
              productosFiltrados.map((producto, index) => (
                <div key={index} className={styles.tarjetaProductoPanelClientes}>
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
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Crear */}
      <Modal
        isOpen={modalCrear}
        onRequestClose={handleCerrarModal}
        contentLabel="Crear Producto"
        className={`${styles.ModalPanel} ${styles.Modal}`}
        closeTimeoutMS={500}
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
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.files[0] })}
            required
          />
          <button type="submit">Guardar</button>
          <button onClick={handleCerrarModal}>Cancelar</button>
        </form>
      </Modal>

      {/* Modal Editar */}
      <Modal
        isOpen={modalEditar}
        onRequestClose={handleCerrarModal}
        contentLabel="Editar Producto"
        className={`${styles.ModalPanelClientes} ${styles.Modal}`}
        closeTimeoutMS={500}
      >
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmitEditar} className={styles.formularioPanel}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productoSeleccionado?.name || ""}
            onChange={handleChange}
            required
          />
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={productoSeleccionado?.categoria || ""}
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
            value={productoSeleccionado?.description || ""}
            onChange={handleChange}
            required
          />
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productoSeleccionado?.price || ""}
            onChange={handleChange}
            required
          />
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, imagen: e.target.files[0] })}
          />
          <button type="submit">Guardar</button>
          <button onClick={handleCerrarModal}>Cancelar</button>
        </form>
      </Modal>

      {/* Modal Eliminar */}
      <Modal
        isOpen={modalEliminar}
        onRequestClose={handleCerrarModal}
        contentLabel="Eliminar Producto"
        className={`${styles.ModalPanelClientes} ${styles.Modal}`}
        closeTimeoutMS={500}
      >
        <h2>¿Estás seguro de que deseas eliminar este producto?</h2>
        <div className={styles.botonesEliminar}>
          <button onClick={handleSubmitEliminar}>Eliminar</button>
          <button onClick={handleCerrarModal}>Cancelar</button>
        </div>
      </Modal>

      {/* Modal Confirmación */}
      <Modal
        isOpen={modalConfirmacion}
        onRequestClose={() => setModalConfirmacion(false)}
        contentLabel="Confirmación"
        className={`${styles.ModalConfirmacion} ${styles.Modal}`}
        closeTimeoutMS={500}
      >
        <h2>{mensajeConfirmacion}</h2>
      </Modal>
    </div>
  );
};

export default ListaProductos;

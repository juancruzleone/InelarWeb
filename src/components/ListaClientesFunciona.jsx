import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

Modal.setAppElement("#__next");

const ListaClientesFunciona = () => {
  const [clientes, setClientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');  // "Todos" seleccionado por defecto
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({ name: "", category: "" });
  const [buscar, setBuscar] = useState('');
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState({});

  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = userData?.token;
  const role = userData?.cuenta?.role;

  useEffect(() => {
    obtenerClientes();
  }, []);

  useEffect(() => {
    filtrarClientes();
  }, [categoriaSeleccionada, buscar, clientes]);

  const obtenerClientes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:2023/api/clientes", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Role": role,
        },
      });
      const data = await response.json();

      setClientes(data);

      const categoriasUnicas = Array.from(
        new Set(data.map((cliente) => cliente.category))
      ).filter(categoria => categoria !== undefined && categoria !== "");
      setCategorias(categoriasUnicas);
      
      setClientesFiltrados(data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarClientes = () => {
    const clientesFiltrados = clientes.filter(cliente => {
      // Coincide con la categoría si la categoría seleccionada no es "Todos"
      const coincideCategoria = categoriaSeleccionada === 'Todos' || cliente.category === categoriaSeleccionada;
      const coincideBusqueda = cliente.name.toLowerCase().includes(buscar.toLowerCase());
      
      return coincideCategoria && coincideBusqueda;
    });
    
    setClientesFiltrados(clientesFiltrados);
  };
  

  const handleCrearCliente = () => {
    setNuevoCliente({ name: "", category: "" }); 
    setErrores({});
    setModalCrear(true);
  };

  const handleEditarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setErrores({
      name: cliente.name.trim() ? '' : "El nombre es obligatorio.",
      category: cliente.category.trim() ? '' : "La categoría es obligatoria."
    });
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
    setClienteSeleccionado(null);
    setErrores({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cliente = modalCrear ? nuevoCliente : clienteSeleccionado;

    if (modalCrear) {
      setNuevoCliente({ ...cliente, [name]: value });
    } else if (modalEditar) {
      setClienteSeleccionado({ ...cliente, [name]: value });
    }

    setErrores((prevErrores) => ({
      ...prevErrores,
      [name]: value.trim() ? '' : name === 'name' ? 'El nombre es obligatorio.' : 'La categoría es obligatoria.'
    }));
  };

  const validarFormulario = (cliente) => {
    const errores = {};
    if (!cliente.name.trim()) {
      errores.name = "El nombre es obligatorio.";
    }
    if (!cliente.category.trim()) {
      errores.category = "La categoría es obligatoria.";
    }
    return errores;
  };

  const handleSubmitCrear = async (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormulario(nuevoCliente);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      const response = await fetch("http://localhost:2023/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Role": role,
        },
        body: JSON.stringify(nuevoCliente),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const createdCliente = await response.json();
      setClientes([...clientes, createdCliente]);
      setModalCrear(false);
      mostrarConfirmacion("Cliente creado exitosamente");
      obtenerClientes(); 
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormulario(clienteSeleccionado);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      const response = await fetch(`http://localhost:2023/api/clientes/${clienteSeleccionado._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Role": role,
        },
        body: JSON.stringify(clienteSeleccionado),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setModalEditar(false);
      mostrarConfirmacion("Cliente editado exitosamente");
      obtenerClientes(); 
    } catch (error) {
      console.error("Error al editar cliente:", error);
    }
  };

  const handleSubmitEliminar = async () => {
    try {
      const response = await fetch(`http://localhost:2023/api/clientes/${clienteSeleccionado._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Role": role,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setModalEliminar(false);
      mostrarConfirmacion("Cliente eliminado exitosamente");
      obtenerClientes(); 
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  const mostrarConfirmacion = (mensaje) => {
    handleCerrarModal(); 
    setMensajeConfirmacion(mensaje);
    setModalConfirmacion(true);
    setTimeout(() => {
      setModalConfirmacion(false);
    }, 3000); 
  }


  return (
    <div>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Clientes</h2>
        <button onClick={handleCrearCliente} className={styles.botonCrearModal}>
          Crear cliente
        </button>
        <input
          type="text"
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          className={styles.buscadorPanel}
          placeholder="Busca el nombre del cliente"
          aria-label="Buscar clientes"
        />
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorCategorias}>
            {['Todos', ...categorias].map((categoria, index) => (
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
              <p>Cargando clientes...</p>
            ) : clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente, index) => (
                <div
                  key={index}
                  className={styles.tarjetaProductoPanelClientes}
                >
                  <h3>{cliente.name}</h3>
                  <div className={styles.contenedorBotonesClientes}>
                    <button
                      onClick={() => handleEditarCliente(cliente)}
                      className={styles.botonEditar}
                    >
                      <Image
                        src="/editar.svg"
                        alt="Editar"
                        width={10}
                        height={10}
                      />
                    </button>
                    <button
                      onClick={() => handleEliminarCliente(cliente)}
                      className={styles.botonEliminar}
                    >
                      <Image
                        src="/eliminar.svg"
                        alt="Eliminar"
                        width={10}
                        height={10}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.textoBuscadorPanelClientes}>
                No se encontraron clientes
              </p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalCrear}
        onRequestClose={handleCerrarModal}
        contentLabel="Crear Cliente"
        className={`${styles.ModalPanelClientes} ${styles.Modal}`}
        closeTimeoutMS={1000}
      >
        <h2>Crear Cliente</h2>
        <form onSubmit={handleSubmitCrear} className={styles.formularioPanel}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nuevoCliente.name}
            onChange={handleChange}
          />
          {errores.name && (
            <p className={styles.errorPanel}>{errores.name}</p>
          )}

          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={nuevoCliente.category}
            onChange={handleChange}
          />
          {errores.category && (
            <p className={styles.errorPanel}>{errores.category}</p>
          )}

          <div className={styles.contenedorBotonesEditar}>
            <button type="submit" className={styles.botonGuardar}>
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCerrarModal}
              className={styles.botonCancelarModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={modalEditar}
        onRequestClose={handleCerrarModal}
        contentLabel="Editar Cliente"
        className={`${styles.ModalPanelClientes} ${styles.Modal}`}
        closeTimeoutMS={1000}
      >
        <h2>Editar Cliente</h2>
        {clienteSeleccionado && (
          <form onSubmit={handleSubmitEditar} className={styles.formularioPanel}>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={clienteSeleccionado.name}
              onChange={handleChange}
            />
            {errores.name && (
              <p className={styles.errorPanel}>{errores.name}</p>
            )}

            <label htmlFor="category">Categoría</label>
            <input
              type="text"
              id="category"
              name="category"
              value={clienteSeleccionado.category}
              onChange={handleChange}
            />
            {errores.category && (
              <p className={styles.errorPanel}>{errores.category}</p>
            )}

            <div className={styles.contenedorBotonesEditar}>
              <button type="submit" className={styles.botonGuardar}>
                Guardar
              </button>
              <button
                type="button"
                onClick={handleCerrarModal}
                className={styles.botonCancelarModal}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={modalEliminar}
        onRequestClose={handleCerrarModal}
        contentLabel="Eliminar Cliente"
        className={`${styles.ModalPanelEditar} ${styles.Modal}`}
        closeTimeoutMS={1000}
      >
        <h2>Eliminar Cliente</h2>
        <p>¿Estás seguro de que deseas eliminar este cliente?</p>
        <div className={styles.contenedorBotonesEditar}>
          <button
            onClick={handleSubmitEliminar}
            className={styles.botonEliminarProducto}
          >
            Eliminar
          </button>
          <button
            onClick={handleCerrarModal}
            className={styles.botonCancelarModal}
          >
            Cancelar
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={modalConfirmacion}
        onRequestClose={() => setModalConfirmacion(false)}
        contentLabel="Confirmación"
        className={`${styles.ModalPanelClientes} ${styles.Modal}`}
        closeTimeoutMS={1000}
      >
        <h2>Confirmación</h2>
        <p>{mensajeConfirmacion}</p>
        <button
          onClick={() => setModalConfirmacion(false)}
          className={styles.botonCancelarModal}
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default ListaClientesFunciona;
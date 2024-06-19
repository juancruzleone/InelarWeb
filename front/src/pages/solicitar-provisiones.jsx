import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";
import * as yup from "yup";

const SolicitarProvisiones = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    cantidad: "",
    fecha: "",
    category: "provisiones", // Agregar la categoría del servicio
  });

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch("http://localhost:2023/api/productos");
        const data = await response.json();

        setProductList(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  const schema = yup.object().shape({
    nombre: yup.string().required("El nombre es obligatorio"),
    email: yup.string().email("Introduce un email válido").required("El email es obligatorio"),
    telefono: yup.string().required("El teléfono es obligatorio"),
    direccion: yup.string().required("La dirección es obligatoria"),
    dispositivo: yup.string().required("Selecciona un dispositivo"),
    cantidad: yup.number().required("La cantidad es obligatoria").positive("La cantidad debe ser positiva"),
    fecha: yup.date().required("La fecha es obligatoria"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });

      const requestBody = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        dispositivo: formData.dispositivo,
        cantidad: formData.cantidad,
        fecha: formData.fecha,
        category: formData.category, // Agregar la categoría del servicio
      };

      const res = await fetch("http://localhost:2023/api/servicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        const data = await res.json();
        alert("Solicitud enviada con éxito");
      } else {
        alert(`Ocurrió un error al enviar la solicitud: ${res.status}`);
      }
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errorMessages = err.errors.join('\n');
        alert(`\n${errorMessages}`);
      } else {
        console.error(err);
        alert("Ocurrió un error al enviar la solicitud");
      }
    }
  };

  return (
    <Layout>
      <h1 className={styles.tituloSolicitudServicio}>Solicitar provisiones</h1>
      <div className={styles.contenedorContenidoServicio}>
        <p className={styles.textoSolicitudServicios}>
          Si quieres solicitar nuestro servicio de entrega de provisiones,
          por favor completa el siguiente formulario con tus datos y los detalles
          de tu pedido. Nos pondremos en contacto contigo lo antes posible
          para confirmar la fecha y el precio.
        </p>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
          <label htmlFor="dispositivo">Dispositivo:</label>
          <select
            id="dispositivo"
            name="dispositivo"
            value={formData.dispositivo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            {productList.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
          />
          <label htmlFor="fecha">Fecha deseada:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.botonSolicitudServicio}>
            Enviar solicitud
          </button>
        </form>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default SolicitarProvisiones;
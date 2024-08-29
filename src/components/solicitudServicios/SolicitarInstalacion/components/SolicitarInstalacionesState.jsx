import { useState, useEffect } from "react";
import { fetchProductos, submitSolicitud } from "@/components/solicitudServicios/SolicitarInstalacion/services/SolicitarInstalacionService";
import { validateField } from "@/components/SolicitudServicios/SolicitarInstalacion/utils/SolicitarInstalacionUtils";

const useFormDataState = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    fecha: "",
    cantidad: "",
    category: "instalaciones",
  });

  const [formErrors, setFormErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    fecha: "",
    cantidad: "",
    general: "",
  });

  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const data = await fetchProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    Object.keys(formData).forEach((field) => {
      errors[field] = validateField(field, formData[field]);
    });

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    try {
      await submitSolicitud(formData);
      setModalIsOpen(true);
      resetForm();
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setFormErrors((prev) => ({
        ...prev,
        general: "Ocurrió un error al enviar la solicitud. Por favor, inténtelo de nuevo.",
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      dispositivo: "",
      fecha: "",
      cantidad: "",
      category: "instalaciones",
    });
    setFormErrors({
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      dispositivo: "",
      fecha: "",
      cantidad: "",
      general: "",
    });
  };

  const closeModal = () => setModalIsOpen(false);

  return {
    formData,
    formErrors,
    productos,
    modalIsOpen,
    handleInputChange,
    handleSubmit,
    closeModal,
    handleKeyDown: (event) => {
      const { key } = event;
      if (!["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(key) && !/[0-9]/.test(key)) {
        event.preventDefault();
      }
    },
  };
};

export default useFormDataState;

import { useState, useEffect } from "react";
import { fetchProducts, submitRequest } from "@/components/solicitudServicios/SolicitarInstalacion/services/SolicitarInstalacionService.jsx";
import { validateField } from "@/components/solicitudServicios/SolicitarInstalacion/utils/SolicitarInstalacionUtils";

const useFormDataState = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    cantidad: "",
    fecha: "",
    category: "instalaciones",
  });

  const [formErrors, setFormErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    cantidad: "",
    fecha: "",
    general: "",
  });

  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error al cargar productos", error);
      }
    };
    loadProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(formData).forEach((field) => {
      errors[field] = validateField(field, formData[field]);
    });

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    try {
      await submitRequest(formData);
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
      cantidad: "",
      fecha: "",
      category: "instalaciones", 
    });
    setFormErrors({
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      dispositivo: "",
      cantidad: "",
      fecha: "",
      general: "",
    });
  };

  const closeModal = () => setModalIsOpen(false);

  return {
    formData,
    formErrors,
    products,
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

import { useState, useEffect } from 'react';
import { validateField } from '@/components/solicitudServicios/SolicitarMantenimiento/utils/SolicitarMantenimientoUtils.jsx';
import { fetchProducts, submitRequest } from '@/components/solicitudServicios/SolicitarMantenimiento/services/SolicitarMantenimientoService.jsx';

const useFormularioInstalaciones = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    fecha: "",
    cantidad: "",
    category: "instalacion",
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

  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
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
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        dispositivo: "",
        fecha: "",
        cantidad: "",
        category: "instalacion",
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
      setTimeout(() => {
        setModalIsOpen(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setFormErrors((prev) => ({
        ...prev,
        general: "Ocurrió un error al enviar la solicitud",
      }));
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return {
    formData,
    formErrors,
    products,
    modalIsOpen,
    closeModal,
    handleInputChange,
    handleSubmit,
  };
};

export default useFormularioInstalaciones;
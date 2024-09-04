import { useState, useEffect } from 'react';
import { validateField } from '@/components/solicitudServicios/SolicitarMantenimiento/utils/SolicitarMantenimientoUtils.jsx';
import { fetchProducts, submitRequest } from '@/components/solicitudServicios/SolicitarMantenimiento/services/SolicitarMantenimientoService.jsx';

const useFormularioMantenimiento = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    fecha: "",
    cantidad: 1,
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

  const handleChange = (e) => {
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

    console.log("Datos del formulario enviados:", formData);

    try {
      const response = await submitRequest(formData);
      if (response) {
        setModalIsOpen(true);
        setTimeout(() => {
          setModalIsOpen(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      setFormErrors((prev) => ({
        ...prev,
        general: err.message || "Ocurrió un error al enviar la solicitud",
      }));
    }
  };

  return {
    formData,
    formErrors,
    products,
    modalIsOpen,
    setModalIsOpen,
    handleChange,
    handleSubmit,
  };
};

export default useFormularioMantenimiento;

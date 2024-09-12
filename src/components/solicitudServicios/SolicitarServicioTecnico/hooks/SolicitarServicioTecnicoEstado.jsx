import { useState, useEffect } from 'react';
import { validateField } from '@/components/solicitudServicios/SolicitarServicioTecnico/utils/SolicitarServicioTecnicoValidaciones.jsx';
import { fetchProducts, submitRequest } from '@/components/solicitudServicios/SolicitarServicioTecnico/services/SolicitarServicioTecnicoService.jsx';

const useFormularioServicioTecnico = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    problema: "",
    fecha: "",
    dispositivo: "",
    cantidad: 1,
    category: "servicio técnico", 
  });

  const [formErrors, setFormErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    problema: "",
    fecha: "",
    dispositivo: "",
    cantidad: "",
    general: "",
  });

  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await fetchProducts();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
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

    // Validar todos los campos
    const errors = {};
    Object.keys(formData).forEach((field) => {
      errors[field] = validateField(field, formData[field]);
    });

    setFormErrors(errors);

    // Si hay errores, no enviar la solicitud
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    // Depuración: Mostrar los datos del formulario antes de enviarlos
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
    productos,
    modalIsOpen,
    setModalIsOpen,
    handleChange,
    handleSubmit,
  };
};

export default useFormularioServicioTecnico;

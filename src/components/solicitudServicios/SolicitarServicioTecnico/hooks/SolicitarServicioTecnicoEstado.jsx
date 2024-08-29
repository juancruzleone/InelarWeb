import { useState, useEffect } from 'react';
import { validateField } from '@/components/solicitudServicios/SolicitarServicioTecnico/utils/SolicitarServicioTecnicoValidaciones.jsx';
import { obtenerProductos, enviarSolicitud } from '@/components/solicitudServicios/SolicitarServicioTecnico/services/SolicitarServicioTecnicoService.jsx';

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
    category: "técnico",
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
        const data = await obtenerProductos();
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

    const errors = {};
    Object.keys(formData).forEach((field) => {
      errors[field] = validateField(field, formData[field]);
    });

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    try {
      await enviarSolicitud(formData);
      setModalIsOpen(true);
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
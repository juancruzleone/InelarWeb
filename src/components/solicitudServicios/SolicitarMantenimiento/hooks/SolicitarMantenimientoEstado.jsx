import { useState, useEffect } from 'react';
import { validateField } from '@/components/solicitudServicios/SolicitarMantenimiento/utils/SolicitarMantenimientoUtils.jsx';
import { obtenerProductos, enviarSolicitud } from '@/components/solicitudServicios/SolicitarMantenimiento/services/SolicitarMantenimientoService.jsx';

const useFormularioMantenimiento = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    fecha: "",
    cantidad: "",
    category: "mantenimiento",
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
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        dispositivo: "",
        fecha: "",
        cantidad: "",
        category: "mantenimiento",
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

export default useFormularioMantenimiento;
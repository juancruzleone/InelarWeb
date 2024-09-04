import { useState, useEffect } from 'react';
import { validateField } from '@/components/solicitudServicios/SolicitarProvision/utils/SolicitarProvisionesValidaciones.jsx';
import { fetchProducts, submitRequest } from '@/components/solicitudServicios/SolicitarProvision/services/SolicitarProvisionesServices.jsx';

const SolicitarProvisionesEstado = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    cantidad: "",
    fecha: "",
    category: "provisiones",
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

  const [productList, setProductList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProducts();
        setProductList(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
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
      await submitRequest(formData);
      setModalIsOpen(true);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        dispositivo: "",
        cantidad: "",
        fecha: "",
        category: "provisiones",
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
    productList,
    modalIsOpen,
    setModalIsOpen,
    handleChange,
    handleSubmit,
  };
};

export default SolicitarProvisionesEstado;

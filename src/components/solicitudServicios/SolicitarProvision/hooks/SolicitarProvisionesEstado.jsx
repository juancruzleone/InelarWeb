import { useState, useCallback } from 'react';
import { validateField } from '@/components/solicitudServicios/SolicitarProvision/utils/SolicitarProvisionesValidaciones.jsx';
import { fetchProducts, submitRequest } from '@/components/solicitudServicios/SolicitarProvision/services/SolicitarProvisionesServices.jsx';

const useFormularioProvisiones = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    dispositivo: '',
    cantidad: 1,
    fecha: '',
    category: 'instalaciones', // Incluyendo la categoría predeterminada
  });

  const [formErrors, setFormErrors] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    dispositivo: '',
    cantidad: '',
    fecha: '',
    general: '',
  });

  const [productList, setProductList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        // Reiniciar el formulario después de enviar
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          direccion: '',
          dispositivo: '',
          cantidad: 1,
          fecha: '',
          category: 'instalaciones', // Reiniciar con la categoría predeterminada
        });
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      setFormErrors((prev) => ({
        ...prev,
        general: err.message || "Ocurrió un error al enviar la solicitud",
      }));
    }
  };

  const loadProducts = useCallback(async () => {
    try {
      const products = await fetchProducts();
      setProductList(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  return {
    formData,
    formErrors,
    productList,
    modalIsOpen,
    setModalIsOpen,
    handleChange,
    handleSubmit,
    loadProducts,
  };
};

export default useFormularioProvisiones;

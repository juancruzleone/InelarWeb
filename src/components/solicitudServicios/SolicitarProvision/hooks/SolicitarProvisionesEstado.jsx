import { useState, useCallback } from 'react';
import { fetchProducts, submitRequest } from '@/components/solicitudServicios/SolicitarProvision/services/SolicitarProvisionesServices';

const useFormularioProvisiones = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    dispositivo: '',
    cantidad: '',
    fecha: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [productList, setProductList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitRequest(formData);
      setModalIsOpen(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        dispositivo: '',
        cantidad: '',
        fecha: '',
      });
    } catch (error) {
      setFormErrors({ general: error.message });
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
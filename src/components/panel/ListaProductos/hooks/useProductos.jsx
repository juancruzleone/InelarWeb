import { useState, useCallback, useEffect } from "react";
import { fetchProducts, createProduct, editProduct, deleteProduct } from "@/components/panel/ListaProductos/services/FetchListaProductos.jsx";
import { validarProducto } from "@/components/panel/ListaProductos/utils/validaciones.jsx";

const useProductos = () => {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    categoria: "",
    description: "",
    price: "",
    imagen: null,
    alt: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
      setToken(userData.token);
    }
  }, []);

  const fetchProductsData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchProducts(token);
      setProducts(data);
      setCategories([...new Set(data.map((product) => product.categoria))]);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchProductsData();
    }
  }, [token, fetchProductsData]);

  const showConfirmation = (message) => {
    setConfirmationMessage(message);
    setConfirmationModal(true);
    setTimeout(() => {
      setConfirmationModal(false);
      setConfirmationMessage("");
    }, 3000);
  };

  const handleCreateProduct = () => {
    setNewProduct({
      name: "",
      categoria: "",
      description: "",
      price: "",
      imagen: null,
      alt: "",
    });
    setCreateModal(true);
    setErrors({});
    setPreviewImage(null);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditModal(true);
    setErrors({});
    setPreviewImage(product.imagen);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const handleCloseModal = () => {
    setCreateModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setSelectedProduct(null);
    setPreviewImage(null);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarProducto(newProduct);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        for (const key in newProduct) {
          formData.append(key, newProduct[key]);
        }
        await createProduct(formData, token);
        fetchProductsData();
        handleCloseModal();
        showConfirmation("Producto creado exitosamente.");
      } catch (error) {
        console.error('Error al crear producto:', error);
        showConfirmation("Hubo un error al crear el producto.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarProducto(selectedProduct);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        for (const key in selectedProduct) {
          if (key === 'imagen' && selectedProduct[key] instanceof File) {
            formData.append(key, selectedProduct[key]);
          } else if (key !== 'imagen' && key !== '_id') {
            formData.append(key, selectedProduct[key]);
          }
        }

        await editProduct(selectedProduct._id, formData, token);
        await fetchProductsData();
        handleCloseModal();
        showConfirmation("Producto editado exitosamente");
      } catch (error) {
        console.error('Error al editar producto:', error);
        showConfirmation("Hubo un error al editar el producto: " + error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct._id, token);
      await fetchProductsData();
      handleCloseModal();
      showConfirmation("Producto eliminado exitosamente.");
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      showConfirmation("Hubo un error al eliminar el producto.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    setErrors(validarProducto({ ...newProduct, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
    setErrors(validarProducto({ ...selectedProduct, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, imagen: file });
    setErrors(validarProducto({ ...newProduct, imagen: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedProduct(prev => ({ ...prev, imagen: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleTextareaInput = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    setErrors(validarProducto({ ...newProduct, [name]: value }));
  };

  const handleEditTextareaInput = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
    setErrors(validarProducto({ ...selectedProduct, [name]: value }));
  };

  return {
    products,
    filteredProducts,
    setFilteredProducts,
    categories,
    selectedCategory,
    createModal,
    editModal,
    deleteModal,
    confirmationModal,
    confirmationMessage,
    selectedProduct,
    newProduct,
    search,
    errors,
    loading,
    previewImage,
    setCreateModal,
    setEditModal,
    setDeleteModal,
    setConfirmationModal,
    setSelectedCategory,
    setSearch,
    handleCreateProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleCloseModal,
    showConfirmation,
    fetchProductsData,
    handleInputChange,
    handleEditInputChange,
    handleFileChange,
    handleEditFileChange,
    handleTextareaInput,
    handleEditTextareaInput,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
  };
};

export default useProductos;
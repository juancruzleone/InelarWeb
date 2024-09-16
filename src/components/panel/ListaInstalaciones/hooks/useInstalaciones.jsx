import { useState, useCallback } from "react";
import { fetchInstallations, createInstallation, updateInstallation, deleteInstallation } from "@/components/panel/ListaInstalaciones/services/FetchInstalaciones.jsx";
import { validateInstallation } from "@/components/panel/ListaInstalaciones/utils/validaciones.jsx";

const useInstalaciones = () => {
  const [installations, setInstallations] = useState([]);
  const [filteredInstallations, setFilteredInstallations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedInstallation, setSelectedInstallation] = useState(null);
  
  // Asegúrate de que 'company' esté inicializado con una cadena vacía
  const [newInstallation, setNewInstallation] = useState({ 
    company: "", 
    address: "", 
    floorSector: "", 
    postalCode: "", 
    city: "", 
    province: "", 
    installationType: "", 
    image: null 
  });
  
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Nuevos estados para manejar errores separados
  const [createErrors, setCreateErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  const fetchInstallationsData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchInstallations();
      console.log("API response:", result);

      if (result.error) {
        throw new Error(result.error);
      }

      if (Array.isArray(result)) {
        setInstallations(result);
        const uniqueCategories = [...new Set(result.map(installation => installation.installationType))];
        setCategories(uniqueCategories);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error fetching installations:", error);
      setInstallations([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateInstallation = () => {
    setCreateModal(true);
    setCreateErrors({}); // Limpiar errores al abrir el modal de creación
  };
  
  const handleEditInstallation = (installation) => {
    setSelectedInstallation({ ...installation });
    setEditModal(true);
    setEditErrors({}); // Limpiar errores al abrir el modal de edición
    if (installation.image) {
      setPreviewImage(installation.image);
    }
  };

  const handleDeleteInstallation = (installation) => {
    setSelectedInstallation({ ...installation });
    setDeleteModal(true);
  };

  const handleCloseModal = () => {
    setCreateModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setCreateErrors({}); // Limpiar errores al cerrar los modales
    setEditErrors({});
  };

  const showConfirmation = (message) => {
    setConfirmationMessage(message);
    setConfirmationModal(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInstallation(newInstallation);
    if (Object.keys(validationErrors).length > 0) {
      setCreateErrors(validationErrors);
      return;
    }
    try {
      await createInstallation(newInstallation);
      fetchInstallationsData();
      showConfirmation("Instalación creada exitosamente");
      handleCloseModal();
    } catch (error) {
      console.error("Error al crear instalación:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInstallation(selectedInstallation);
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }
    try {
      await updateInstallation(selectedInstallation._id, selectedInstallation);
      fetchInstallationsData();
      showConfirmation("Instalación editada exitosamente");
      handleCloseModal();
    } catch (error) {
      console.error("Error al editar la instalación:", error);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedInstallation) {
      console.error("No installation selected for deletion");
      return;
    }
    try {
      await deleteInstallation(selectedInstallation._id);
      fetchInstallationsData();
      showConfirmation("Instalación eliminada exitosamente");
      handleCloseModal();
    } catch (error) {
      console.error("Error al eliminar la instalación:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstallation((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedInstallation((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewInstallation((prev) => ({ ...prev, image: file }));
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedInstallation((prev) => ({ ...prev, image: file }));
  };

  return {
    installations,
    filteredInstallations,
    setFilteredInstallations,
    categories,
    selectedCategory,
    createModal,
    editModal,
    deleteModal,
    confirmationModal,
    confirmationMessage,
    selectedInstallation,
    newInstallation,
    search,
    createErrors,
    editErrors,
    loading,
    previewImage,
    setCreateModal,
    setEditModal,
    setDeleteModal,
    setConfirmationModal,
    setSelectedCategory,
    setSearch,
    setNewInstallation,
    setCreateErrors,
    setEditErrors,
    handleCreateInstallation,
    handleEditInstallation,
    handleDeleteInstallation,
    handleCloseModal,
    showConfirmation,
    fetchInstallationsData,
    handleInputChange,
    handleEditInputChange,
    handleFileChange,
    handleEditFileChange,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
  };
};

export default useInstalaciones;

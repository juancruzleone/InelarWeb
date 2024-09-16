import { useState, useCallback } from "react";
import { fetchInstallations, createInstallation, updateInstallation, deleteInstallation } from "@/components/panel/ListaInstalaciones/services/FetchInstalaciones.jsx";
import validateInstallation from "@/components/panel/ListaInstalaciones/utils/validaciones.jsx";

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
  const [newInstallation, setNewInstallation] = useState({ company: "", address: "", floorSector: "", postalCode: "", city: "", province: "", installationType: "", image: null });
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch installations data from API
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


  const handleCreateInstallation = () => setCreateModal(true);
  const handleEditInstallation = (installation) => {
    setSelectedInstallation(installation);
    setPreviewImage(installation.image);
    setEditModal(true);
  };
  const handleDeleteInstallation = (installation) => {
    setSelectedInstallation(installation);
    setDeleteModal(true);
  };
  const handleCloseModal = () => {
    setCreateModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setConfirmationModal(false);
    setSelectedInstallation(null);
    setNewInstallation({ company: "", address: "", floorSector: "", postalCode: "", city: "", province: "", installationType: "", image: null });
    setErrors({});
    setPreviewImage(null);
  };
  const showConfirmation = (message) => {
    setConfirmationMessage(message);
    setConfirmationModal(true);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstallation({ ...newInstallation, [name]: value });
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedInstallation({ ...selectedInstallation, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewInstallation({ ...newInstallation, image: file });
  };
  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedInstallation({ ...selectedInstallation, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };


  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInstallation(newInstallation);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await createInstallation(newInstallation);
      fetchInstallationsData();
      showConfirmation("Instalación creada exitosamente");
      handleCloseModal();
    } catch (error) {
      console.error("Error creating installation:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInstallation(selectedInstallation);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await updateInstallation(selectedInstallation._id, selectedInstallation);
      fetchInstallationsData();
      showConfirmation("Instalación editada exitosamente");
      handleCloseModal();
    } catch (error) {
      console.error("Error editing installation:", error);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteInstallation(selectedInstallation._id);
      fetchInstallationsData();
      showConfirmation("Instalación eliminada exitosamente");
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting installation:", error);
    }
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
    errors,
    loading,
    previewImage,
    setCreateModal,
    setEditModal,
    setDeleteModal,
    setConfirmationModal,
    setSelectedCategory,
    setSearch,
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
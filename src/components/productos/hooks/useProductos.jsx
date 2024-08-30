import { useState, useEffect } from "react";
import { fetchProductos } from "@/components/productos/services/FetchProductos";

const useProductosState = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProductos();

        const filteredProducts = categoriaSeleccionada
          ? data.filter((producto) => producto.categoria === categoriaSeleccionada)
          : data;

        setProductos(filteredProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoriaSeleccionada]);

  const changeCategory = (category) => {
    setCategoriaSeleccionada(category);
  };

  return {
    productos,
    loading,
    categoriaSeleccionada,
    changeCategory,
  };
};

export default useProductosState;

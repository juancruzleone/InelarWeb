import { useState, useEffect } from "react";
import { fetchProductos } from "@/components/productos/services/FetchProductos";

const useProductos = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const data = await fetchProductos();

        const filteredProducts = selectedCategory
          ? data.filter((product) => product.categoria === selectedCategory)
          : data;

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [selectedCategory]);

  const changeCategory = (category) => {
    setSelectedCategory(category);
  };

  return {
    products,
    loading,
    selectedCategory,
    changeCategory,
  };
};

export default useProductos;

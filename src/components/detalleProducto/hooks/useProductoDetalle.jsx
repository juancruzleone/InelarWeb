import { useState, useEffect } from 'react';
import { fetchProduct, fetchProducts, fetchRelatedProducts } from '@/components/detalleProducto/services/FetchDetalle.jsx';

const useProductoDetalle = (id, initialProducto, initialProductosRelacionados) => {
  const [producto, setProducto] = useState(initialProducto);
  const [productosRelacionados, setProductosRelacionados] = useState(initialProductosRelacionados);
  const [loading, setLoading] = useState(!initialProducto || !initialProductosRelacionados);

  useEffect(() => {
    if (!initialProducto || !initialProductosRelacionados) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const fetchedProducto = await fetchProduct(id);
          const fetchedProductos = await fetchProducts();

          const fetchedProductosRelacionados = fetchRelatedProducts(fetchedProductos, fetchedProducto.categoria, id);

          setProducto(fetchedProducto);
          setProductosRelacionados(fetchedProductosRelacionados);
        } catch (error) {
          console.error('Error al obtener detalles del producto:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id, initialProducto, initialProductosRelacionados]);

  return { producto, productosRelacionados, loading };
};

export default useProductoDetalle;

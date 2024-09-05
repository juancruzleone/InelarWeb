export const validarProducto = (product) => {
  let errors = {};

  if (!product.name?.trim()) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!product.categoria?.trim()) {
    errors.categoria = "La categoría es obligatoria.";
  }

  if (!product.description?.trim()) {
    errors.description = "La descripción es obligatoria.";
  }

  if (!product.price) {
    errors.price = "El precio es obligatorio.";
  } else if (isNaN(product.price) || Number(product.price) <= 0) {
    errors.price = "El precio debe ser un número mayor que cero.";
  }

  // Remove the image validation if it's not a new product
  if (!product._id && (!product.imagen || product.imagen.size === 0)) {
    errors.imagen = "La imagen es obligatoria.";
  }

  return errors;
};

export const handleInputChange = (e, product, setProduct, setErrors) => {
  const { name, value } = e.target;
  const updatedProduct = { ...product, [name]: value };
  setProduct(updatedProduct);
  
  const newErrors = validarProducto(updatedProduct);
  setErrors(newErrors);
};

export const handleFileChange = (e, product, setProduct,
 setErrors) => {
  const { name, files } = e.target;
  const updatedProduct = { ...product, [name]: files[0] };
  setProduct(updatedProduct);

  const newErrors = validarProducto(updatedProduct);
  setErrors(newErrors);
};

export const handleTextareaInput = (e, product, setProduct, setErrors) => {
  const { name, value } = e.target;
  const updatedProduct = { ...product, [name]: value };
  setProduct(updatedProduct);

  const newErrors = validarProducto(updatedProduct);
  setErrors(newErrors);
};
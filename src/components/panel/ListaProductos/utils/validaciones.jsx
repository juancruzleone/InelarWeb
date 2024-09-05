export const validateProduct = (product) => {
  let errors = {};

  if (!product.name?.trim()) {
    errors.name = "El nombre es requerido.";
  }

  if (!product.category?.trim()) {
    errors.category = "La categoria es requerida.";
  }

  if (!product.description?.trim()) {
    errors.description = "La descripción es requerida.";
  }

  if (!product.price) {
    errors.price = "El precio es requerido.";
  } else if (isNaN(product.price) || Number(product.price) <= 0) {
    errors.price = "El precio tiene que ser mayor a 0.";
  }

  // Remove the image validation if it's not a new product
  if (!product._id && (!product.image || product.image.size === 0)) {
    errors.image = "La imagen es requerida.";
  }

  return errors;
};

export const handleInputChange = (e, product, setProduct, setErrors) => {
  const { name, value } = e.target;
  const updatedProduct = { ...product, [name]: value };
  setProduct(updatedProduct);
  
  const newErrors = validateProduct(updatedProduct);
  setErrors(newErrors);
};

export const handleFileChange = (e, product, setProduct, setErrors) => {
  const { name, files } = e.target;
  const updatedProduct = { ...product, [name]: files[0] };
  setProduct(updatedProduct);

  const newErrors = validateProduct(updatedProduct);
  setErrors(newErrors);
};

export const handleTextareaInput = (e, product, setProduct, setErrors) => {
  const { name, value } = e.target;
  const updatedProduct = { ...product, [name]: value };
  setProduct(updatedProduct);

  const newErrors = validateProduct(updatedProduct);
  setErrors(newErrors);
};
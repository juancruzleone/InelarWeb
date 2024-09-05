const validateForm = (client) => {
  let errors = {};

  if (!client.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!client.category.trim()) {
    errors.category = "La categoría es obligatoria";
  }

  return errors;
};

export default validateForm;

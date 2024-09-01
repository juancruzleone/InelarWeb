const validarFormulario = (cliente) => {
  let errores = {};

  if (!cliente.name.trim()) {
    errores.name = "El nombre es obligatorio";
  }

  if (!cliente.category.trim()) {
    errores.category = "La categoría es obligatoria";
  }

  return errores;
};

export default validarFormulario;
// Validaciones.jsx
export const validarCampo = (valor, tipo) => {
    if (valor.trim() === '') {
      return 'Este campo es requerido';
    }
  
    switch (tipo) {
      case 'email':
        return /\S+@\S+\.\S+/.test(valor) ? '' : 'Email inválido';
      case 'number':
        return isNaN(valor) ? 'Debe ser un número' : '';
      default:
        return '';
    }
  };
  
  export const validarFormulario = (formState, formFields) => {
    const errores = {};
    formFields.forEach(field => {
      const error = validarCampo(formState[field.name] || '', field.type);
      if (error) {
        errores[field.name] = error;
      }
    });
    return errores;
  };
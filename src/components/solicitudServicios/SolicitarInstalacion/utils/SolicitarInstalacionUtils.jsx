export const validateField = (name, value) => {
  let error = "";

  const today = new Date().setHours(0, 0, 0, 0); 

  switch (name) {
    case "nombre":
      error = value ? "" : "El nombre es obligatorio";
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = "El correo electrónico es obligatorio";
      } else if (!emailRegex.test(value)) {
        error = "El correo electrónico no es válido";
      }
      break;
    case "telefono":
      const telefonoRegex = /^[0-9]+$/;
      if (!value) {
        error = "El teléfono es obligatorio";
      } else if (!telefonoRegex.test(value)) {
        error = "El teléfono solo debe contener números";
      }
      break;
    case "direccion":
      error = value ? "" : "La dirección es obligatoria";
      break;
    case "dispositivo":
      error = value ? "" : "Selecciona un dispositivo";
      break;
    case "fecha":
      if (!value) {
        error = "La fecha es obligatoria";
      } else {
        const selectedDate = new Date(value).setHours(0, 0, 0, 0);
        if (selectedDate <= today) {
          error = "La fecha debe ser posterior a la actual";
        }
      }
      break;
    case "cantidad":
      error = value > 0 ? "" : "La cantidad debe ser mayor que cero";
      break;
    default:
      break;
  }

  return error;
};

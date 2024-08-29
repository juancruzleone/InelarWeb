export const validateField = (name, value) => {
    let error = "";
  
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
      case "problema":
        error = value ? "" : "Describe el problema";
        break;
      case "dispositivo":
        error = value ? "" : "Selecciona un dispositivo";
        break;
      case "cantidad":
        error = value > 0 ? "" : "La cantidad debe ser mayor que cero";
        break;
      case "fecha":
        error = value ? "" : "La fecha es obligatoria";
        break;
      default:
        break;
    }
  
    return error;
  };
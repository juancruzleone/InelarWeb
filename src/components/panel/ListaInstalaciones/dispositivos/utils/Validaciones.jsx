export const validateDevice = (device) => {
    let errors = {};
  
    // Validación para 'nombre'
    if (!device.nombre?.trim()) {
      errors.nombre = "El nombre del dispositivo es un campo requerido.";
    } else if (device.nombre.length < 1) {
      errors.nombre = "El nombre debe tener al menos 1 carácter.";
    } else if (device.nombre.length > 100) {
      errors.nombre = "El nombre no puede tener más de 100 caracteres.";
    }
  
    // Validación para 'ubicacion'
    if (!device.ubicacion?.trim()) {
      errors.ubicacion = "La ubicación del dispositivo es un campo requerido.";
    } else if (device.ubicacion.length < 1) {
      errors.ubicacion = "La ubicación debe tener al menos 1 carácter.";
    } else if (device.ubicacion.length > 255) {
      errors.ubicacion = "La ubicación no puede tener más de 255 caracteres.";
    }
  
    // Validación para 'estado'
    if (!device.categoria?.trim()) {
      errors.categoria = "La categoria del dispositivo es un campo requerido.";
    } else if (!['bomba', 'hidrante'].includes(device.categoria)) {
      errors.categoria = "La categoria debe ser 'bomba' o 'hidrante'.";
    }
  
    return { newErrors: errors };
  };
  
  export const handleInputChange = (e, device) => {
    const { name, value } = e.target;
    const updatedDevice = { ...device, [name]: value };
    const { newErrors } = validateDevice(updatedDevice);
    return { updatedDevice, newErrors };
  };
  
  export const handleTextareaInput = (e, device) => {
    const { name, value } = e.target;
    const updatedDevice = { ...device, [name]: value };
    const { newErrors } = validateDevice(updatedDevice);
    return { updatedDevice, newErrors };
  };
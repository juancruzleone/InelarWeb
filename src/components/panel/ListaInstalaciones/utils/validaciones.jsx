// validaciones.jsx
export const validateInstallation = (installation) => {
  let errors = {};

  // Validación para 'company'
  if (!installation.company?.trim()) {
    errors.company = "La empresa es un campo requerido.";
  } else if (installation.company.length < 1) {
    errors.company = "La empresa debe tener al menos 1 carácter.";
  } else if (installation.company.length > 255) {
    errors.company = "La empresa no puede tener más de 255 caracteres.";
  }

  // Validación para 'address'
  if (!installation.address?.trim()) {
    errors.address = "La dirección es un campo requerido.";
  } else if (installation.address.length < 1) {
    errors.address = "La dirección debe tener al menos 1 carácter.";
  } else if (installation.address.length > 255) {
    errors.address = "La dirección no puede tener más de 255 caracteres.";
  }

  // Validación para 'floorSector'
  if (!installation.floorSector?.trim()) {
    errors.floorSector = "El piso/sector es un campo requerido.";
  } else if (installation.floorSector.length < 1) {
    errors.floorSector = "El piso/sector debe tener al menos 1 carácter.";
  } else if (installation.floorSector.length > 100) {
    errors.floorSector = "El piso/sector no puede tener más de 100 caracteres.";
  }

  // Validación para 'postalCode'
  if (!installation.postalCode?.trim()) {
    errors.postalCode = "El código postal es un campo requerido.";
  } else if (!/^\d{4,6}$/.test(installation.postalCode)) {
    errors.postalCode = "El código postal debe tener entre 4 y 6 dígitos.";
  }

  // Validación para 'city'
  if (!installation.city?.trim()) {
    errors.city = "La ciudad es un campo requerido.";
  } else if (installation.city.length < 1) {
    errors.city = "La ciudad debe tener al menos 1 carácter.";
  } else if (installation.city.length > 100) {
    errors.city = "La ciudad no puede tener más de 100 caracteres.";
  }

  // Validación para 'province'
  if (!installation.province?.trim()) {
    errors.province = "La provincia es un campo requerido.";
  } else if (installation.province.length < 1) {
    errors.province = "La provincia debe tener al menos 1 carácter.";
  } else if (installation.province.length > 100) {
    errors.province = "La provincia no puede tener más de 100 caracteres.";
  }

  // Validación para 'installationType'
  if (!installation.installationType?.trim()) {
    errors.installationType = "El tipo de instalación es un campo requerido.";
  } else if (installation.installationType.length < 1) {
    errors.installationType = "El tipo de instalación debe tener al menos 1 carácter.";
  } else if (installation.installationType.length > 100) {
    errors.installationType = "El tipo de instalación no puede tener más de 100 caracteres.";
  }

  return errors;
};

export const handleInputChange = (e, installation) => {
  const { name, value } = e.target;
  const updatedInstallation = { ...installation, [name]: value };
  const newErrors = validateInstallation(updatedInstallation);
  return { updatedInstallation, newErrors };
};

export const handleTextareaInput = (e, installation) => {
  const { name, value } = e.target;
  const updatedInstallation = { ...installation, [name]: value };
  const newErrors = validateInstallation(updatedInstallation);
  return { updatedInstallation, newErrors };
};
export const validateUsername = (username) => {
  if (!username) {
    return "El nombre de usuario es obligatorio";
  } else if (username.length < 6) {
    return "El nombre de usuario debe tener al menos 6 caracteres";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!email) {
    return "El correo electrónico es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "Correo electrónico no válido";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "La contraseña es obligatoria";
  } else if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
  return "";
};

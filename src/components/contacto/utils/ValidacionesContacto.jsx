export const validateName = (name) => {
    if (!name) {
      return "El nombre es obligatorio";
    } else if (name.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    return "";
  };
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(email)) {
      return "El correo electrónico no es válido";
    }
    return "";
  };
  
  export const validateMessage = (message) => {
    if (!message) {
      return "El mensaje es obligatorio";
    } else if (message.length < 10) {
      return "El mensaje debe tener al menos 10 caracteres";
    }
    return "";
  };
  
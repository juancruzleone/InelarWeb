/**
 * Valida el nombre de usuario.
 * @param {string} username - El nombre de usuario a validar.
 * @returns {string} - Mensaje de error si la validación falla, o una cadena vacía si es válida.
 */
export const validateUsername = (username) => {
    if (!username) {
      return "El nombre de usuario es obligatorio";
    } else if (username.length < 6) {
      return "El nombre de usuario debe tener al menos 6 caracteres";
    }
    return "";
  };
  
  /**
   * Valida la contraseña.
   * @param {string} password - La contraseña a validar.
   * @returns {string} - Mensaje de error si la validación falla, o una cadena vacía si es válida.
   */
  export const validatePassword = (password) => {
    if (!password) {
      return "La contraseña es obligatoria";
    } else if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    return "";
  };
  
export const validateLoginFields = (username, password) => {
    if (!username || !password) {
      return "Ingrese ambos campos para iniciar sesión.";
    }
    return null;
  };
  
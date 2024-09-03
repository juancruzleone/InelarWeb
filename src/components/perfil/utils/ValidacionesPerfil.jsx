export const validateUserName = (userName, setError) => {
    if (userName.trim().length < 6) {
      setError("El nombre de usuario debe tener al menos 6 caracteres");
      return false;
    } else {
      setError(null);
      return true;
    }
  };
  
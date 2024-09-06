import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from "@/styles/Home.module.css";

const FormularioRegistro = ({
  username,
  password,
  error,
  showPassword,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  togglePasswordVisibility,
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formularioLogin}>
      <label htmlFor="usuario" className={styles.formLabel}>
        Usuario
      </label>
      <input
        type="text"
        id="usuario"
        name="usuario"
        placeholder="Crea un usuario nuevo"
        value={username}
        onChange={handleUsernameChange}
        className={styles.inputField}
      />
      {error.username && <p className={styles.error}>{error.username}</p>}

      <label htmlFor="contraseña" className={styles.formLabel}>
        Contraseña
      </label>
      <div className={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          id="contraseña"
          name="contraseña"
          placeholder="Crea la contraseña"
          value={password}
          onChange={handlePasswordChange}
          className={styles.inputField}
        />
        <button
          type="button"
          className={styles.botonOjito}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {error.password && <p className={styles.error}>{error.password}</p>}

      <button type="submit" className={styles.submitButton}>Regístrate</button>
      {error.general && <p className={styles.error}>{error.general}</p>}
    </form>
  );
};

export default FormularioRegistro;

import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from "@/styles/Register.module.css";

const FormularioRegistro = ({
  username,
  email, 
  password,
  error,
  showPassword,
  isLoading,
  handleUsernameChange,
  handleEmailChange, 
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

      <label htmlFor="email" className={styles.formLabel}>
        Correo electrónico
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChange={handleEmailChange}
        className={styles.inputField}
      />
      {error.email && <p className={styles.error}>{error.email}</p>}

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

      <button 
        type="submit" 
        className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className={styles.loader}></span>
            Registrando...
          </>
        ) : (
          "Regístrate"
        )}
      </button>
      {error.general && <p className={styles.error}>{error.general}</p>}
    </form>
  );
};

export default FormularioRegistro;
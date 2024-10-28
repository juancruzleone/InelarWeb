import Link from "next/link";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from "@/styles/Login.module.css";

const FormularioLogin = ({
  username,
  password,
  error,
  showPassword,
  setUsername,
  setPassword,
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
        placeholder="Ingresa tu usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.inputField}
      />
      <label htmlFor="contraseña" className={styles.formLabel}>
        Contraseña
      </label>
      <div className={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          id="contraseña"
          name="contraseña"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      <button type="submit" className={styles.submitButton}>
        Iniciar sesión
      </button>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.textoRedireccionaminetoLogin}>
        Si no tenés una cuenta,
        <Link href="/register" className={styles.registroLogin}>
          regístrate
        </Link>
      </p>
    </form>
  );
};

export default FormularioLogin;
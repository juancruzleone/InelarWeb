import styles from '@/styles/Home.module.css';

const PerfilUsuario = ({ user }) => {
  if (!user) {
    return (
      <div className={styles.contenedorPerfilUsuario}>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className={styles.contenedorPerfilUsuario}>
      <div className={styles.contenidoPerfilUsuario}>
        <h1>Perfil de {user.userName}</h1>
        <p className={styles.idUsuario}>ID: {user._id}</p>

        {user.role !== 'admin' && (
          <p className={styles.emailUsuario}>Email: {user.email}</p>
        )}
      </div>
    </div>
  );
};

export default PerfilUsuario;

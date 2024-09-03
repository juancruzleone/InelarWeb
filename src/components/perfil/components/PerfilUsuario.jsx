import styles from '@/styles/Home.module.css';

const PerfilUsuario = ({ user, setShowEditModal }) => (
  <div className={styles.contenedorPerfilUsuario}>
    <div className={styles.contenidoPerfilUsuario}>
      <h1>Perfil de {user.userName}</h1>
      <p className={styles.idUsuario}>{user._id}</p>
      <button onClick={() => setShowEditModal(true)} className={styles.botonEditarPerfil}>Editar Perfil</button>
    </div>
  </div>
);

export default PerfilUsuario;

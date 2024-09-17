import styles from "@/styles/Home.module.css";

export default function UsuarioItem({ user }) {
  return (
    <div className={styles.tarjetaProductoPanel}>
      <h3>{user.userName}</h3>
      <div className={styles.contenidoTarjetaProductoPanelContacto}>
        <p><span>ID:</span> {user._id}</p>
        <p><span>Email:</span> {user.email}</p>
        <p><span>Rol:</span> {user.role}</p>
      </div>
    </div>
  );
}

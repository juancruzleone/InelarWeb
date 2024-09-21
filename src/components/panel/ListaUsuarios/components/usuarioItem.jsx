import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function UsuarioItem({ user }) {
  return (
    <div className={styles.tarjetaProductoPanel}>
      <h3>{user.userName}</h3>
      <div className={styles.contenidoTarjetaProductoPanelContacto}>
        <p><span>ID:</span> {user._id}</p>
        <p><span>Email:</span> {user.email}</p>
        <p><span>Rol:</span> {user.role}</p>
        <Link href={`/perfilUsuario/${user._id}`} className={styles.verPerfilLink}>
          Ver perfil
        </Link>
      </div>
    </div>
  );
}
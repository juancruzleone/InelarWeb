import styles from "@/styles/ListaUsuarios.module.css";
import Link from "next/link";

export default function UsuarioItem({ user }) {
  const userRole = user.role || "usuario";

  return (
    <div className={styles.tarjetaProductoPanel}>
      <h3>{user.userName}</h3>
      <p className={styles.categoriaUsuario}>{userRole}</p>
      <div className={styles.contenidoTarjetaProductoPanelContacto}>
        <p><span>ID:</span> {user._id}</p>
        <p id={styles.emailUsuario}><span>Email:</span> {user.email}</p>
   
        <Link href={`/perfilUsuario/${user._id}`} className={styles.verPerfilLink}>
          Ver perfil
        </Link>
      </div>
    </div>
  );
}
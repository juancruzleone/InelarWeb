import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/ListaUsuarios.module.css";
import UsuarioItem from "@/components/panel/ListaUsuarios/components/usuarioItem";
import useUsuarios from "@/components/panel/ListaUsuarios/hooks/useUsuarios";

const ListaUsuarios = () => {
  const { filteredUsers, loading, error, searchTerm, setSearchTerm } = useUsuarios();
  const router = useRouter();

  useEffect(() => {
    if (error && (error.includes("No autorizado") || error.includes("No se encontró"))) {
      router.push('/login');
    }
  }, [error, router]);

  if (loading) {
    return <p className={styles.cargandoUsuarios}>Cargando usuarios...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.app}>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Lista de Usuarios</h2>
        <input
          type="text"
          placeholder="Busca por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.buscadorPanel}
          aria-label="Buscador usuarios"
        />
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorProductosPanel}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UsuarioItem key={user._id} user={user} />
              ))
            ) : (
              <p className={styles.textoBuscadorPanelUsuarios}>Ningún usuario encontrado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaUsuarios;
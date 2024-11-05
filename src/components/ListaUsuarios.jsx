import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/ListaUsuarios.module.css";
import UsuarioItem from "@/components/panel/ListaUsuarios/components/usuarioItem";
import useUsuarios from "@/components/panel/ListaUsuarios/hooks/useUsuarios";
import { useTheme } from '@/components/ThemeProvider'

const ListaUsuarios = () => {
  const { filteredUsers, loading, error, searchTerm, setSearchTerm } = useUsuarios();
  const router = useRouter();
  const { theme } = useTheme()

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
    <div className={styles.app} data-theme={theme}>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Lista de usuarios</h2>
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
              <div className={styles.listaUsuariosScrollable}>
                {filteredUsers.map((user) => (
                  <UsuarioItem key={user._id} user={user} />
                ))}
              </div>
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
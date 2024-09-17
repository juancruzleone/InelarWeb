import styles from "@/styles/Home.module.css";
import UsuarioItem from "@/components/panel/ListaUsuarios/components/UsuarioItem.jsx";
import useUsuarios from "@/components/panel/ListaUsuarios/hooks/useUsuarios.jsx";

const ListaUsuarios = () => {
  const { filteredUsers, loading, searchTerm, setSearchTerm } = useUsuarios();

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
            {loading ? (
              <p className={styles.cargandoUsuarios}>Cargando usuarios...</p>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <UsuarioItem key={index} user={user} />
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

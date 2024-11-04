import styles from "@/styles/ListaMensajes.module.css";
import MensajeItem from "@/components/panel/ListaMensajes/components/MensajeItem.jsx";
import useMensajes from "@/components/panel/ListaMensajes/hooks/ListaMensajesEstado.jsx";
import { useTheme } from '@/components/ThemeProvider'

const ListaMensajes = () => {
  const { filteredMessages, loading, searchTerm, setSearchTerm } = useMensajes();
  const { theme } = useTheme()

  return (
    <div className={styles.app}  data-theme={theme}>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Mensajes de contacto</h2>
        <input
          type="text"
          placeholder="Buca por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.buscadorPanel}
          aria-label="Buscador mensajes de contacto"
        />
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorProductosPanel}>
            {loading ? (
              <p className={styles.cargandoMensajes}>Cargando mensajes...</p>
            ) : filteredMessages.length > 0 ? (
              filteredMessages.map((message, index) => (
                <MensajeItem key={index} message={message} />
              ))
            ) : (
              <p className={styles.textoBuscadorPanelMensajes}>Ningun mensaje encontrado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaMensajes;

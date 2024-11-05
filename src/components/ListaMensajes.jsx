import styles from "@/styles/ListaMensajes.module.css";
import MensajeItem from "@/components/panel/ListaMensajes/components/MensajeItem.jsx";
import useMensajes from "@/components/panel/ListaMensajes/hooks/ListaMensajesEstado.jsx";
import { useTheme } from '@/components/ThemeProvider'

export default function Component() {
  const { filteredMessages, loading, searchTerm, setSearchTerm } = useMensajes();
  const { theme } = useTheme()

  return (
    <div className={styles.app} data-theme={theme}>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Mensajes de contacto</h2>
        <input
          type="text"
          placeholder="Busca por nombre o email..."
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
              <div className={styles.listaConScroll}>
                {filteredMessages.map((message, index) => (
                  <MensajeItem key={index} message={message} />
                ))}
              </div>
            ) : (
              <p className={styles.textoBuscadorPanelMensajes}>Ningún mensaje encontrado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
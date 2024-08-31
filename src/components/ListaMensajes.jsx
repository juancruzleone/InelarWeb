import React from "react";
import styles from "@/styles/Home.module.css";
import MensajeItem from "@/components/panel/ListaMensajes/components/MensajeItem.jsx";
import useMensajes from "@/components/panel/ListaMensajes/hooks/ListaMensajesEstado.jsx";

export default function ListaMensajes() {
  const { filteredMessages, loading, searchTerm, setSearchTerm } = useMensajes();

  return (
    <div className={styles.app}>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Mensajes de contacto</h2>
        <input
          type="text"
          placeholder="Search message by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.buscadorPanel} 
          aria-label="Search contact messages"
        />
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorProductosPanel}>
            {loading ? (
              <p>Loading messages...</p>
            ) : filteredMessages.length > 0 ? (
              filteredMessages.map((message, index) => (
                <MensajeItem key={index} message={message} />
              ))
            ) : (
              <p className={styles.textoBuscadorPanelMensajes}>No messages found matching your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

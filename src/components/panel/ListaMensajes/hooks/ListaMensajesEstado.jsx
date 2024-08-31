import { useState, useEffect } from "react";
import { fetchMensajes } from "@/components/panel/ListaMensajes/services/FetchListaMensajes.jsx";
import { filterMensajes } from "@/components/panel/ListaMensajes/utils/ListasMensajesUtils.jsx";

export default function useMensajes() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const getMensajes = async () => {
      setLoading(true);
      try {
        const data = await fetchMensajes();
        setMessages(data);
        setFilteredMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    getMensajes();
  }, []);

  useEffect(() => {
    setFilteredMessages(filterMensajes(messages, searchTerm));
  }, [searchTerm, messages]);

  return { filteredMessages, loading, searchTerm, setSearchTerm };
}

import { useState, useEffect } from "react";
import { fetchMessages } from "@/components/panel/ListaMensajes/services/FetchListaMensajes.jsx";
import { filterMessages } from "@/components/panel/ListaMensajes/utils/ListasMensajesUtils.jsx";

export default function useMensajes() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const data = await fetchMessages();
        setMessages(data);
        setFilteredMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  useEffect(() => {
    setFilteredMessages(filterMessages(messages, searchTerm));
  }, [searchTerm, messages]);

  return { filteredMessages, loading, searchTerm, setSearchTerm };
}

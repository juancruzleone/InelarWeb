export async function fetchMensajes() {
    try {
      const response = await fetch("http://localhost:2023/api/contactos");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching mensajes:", error);
      throw error;
    }
  }
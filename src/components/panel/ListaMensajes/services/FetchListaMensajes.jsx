export async function fetchMessages() {
  try {
    const response = await fetch("https://inelarweb-back.onrender.com/api/contactos");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

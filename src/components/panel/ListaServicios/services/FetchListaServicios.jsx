export async function fetchServicios() {
    try {
      const response = await fetch("https://inelarweb-back.onrender.com/api/servicios");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching servicios:", error);
      throw error;
    }
  }
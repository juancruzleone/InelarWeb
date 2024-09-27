export async function fetchUserProfile(id) {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`https://inelarweb-back.onrender.com/api/cuentas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
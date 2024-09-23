export async function fetchAllUsers() {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData || !userData.token) {
      throw new Error('Token no encontrado en localStorage');
    }

    
    const response = await fetch('https://inelarweb-back.onrender.com/api/cuentas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`  
      }
    });

    if (!response.ok) {
      throw new Error("La respuesta de la red no fue satisfactoria");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// services/FetchUsers.js
export async function fetchUsers() {
  try {
    const response = await fetch("https://inelarweb-back.onrender.com/api/cuentas");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
export const fetchUserProfile = async (id) => {
  try {
    const response = await fetch(`https://inelarweb-back.onrender.com/api/cuentas/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

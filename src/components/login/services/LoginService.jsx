export const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:2023/api/cuenta/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: username, password }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error en la solicitud");
    }
  
    return await response.json();
  };
  
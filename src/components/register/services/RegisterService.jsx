export const registerUser = async ({ username, password }) => {
    return fetch("http://localhost:2023/api/cuenta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: username, password }),
    });
  };
  
  export const loginUser = async ({ username, password }) => {
    return fetch("http://localhost:2023/api/cuenta/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: username, password }),
    });
  };
  
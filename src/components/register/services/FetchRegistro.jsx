export const registerUser = async ({ username, email, password }) => {
  return fetch("https://inelarweb-back.onrender.com/api/cuenta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: username, email, password }),
  });
};

export const loginUser = async ({ username, password }) => {
  return fetch("https://inelarweb-back.onrender.com/api/cuenta/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: username, password }),
  });
};

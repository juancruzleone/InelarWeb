const API_URL = "https://inelarweb-back.onrender.com/api/clientes";

export const getClients = async (token, role) => {
  const response = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Role": role,
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener los clientes");
  }
  return await response.json();
};

export const createClient = async (client, token, role) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Role": role,
    },
    body: JSON.stringify(client),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al crear el cliente");
  }
  return await response.json();
};

export const updateClient = async (client, token, role) => {
  const response = await fetch(`${API_URL}/${client._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Role": role,
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage;
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.message || "Error al editar el cliente";
    } catch (e) {
      errorMessage = errorText || "Error al editar el cliente";
    }
    throw new Error(errorMessage);
  }

  const responseText = await response.text();
  if (!responseText) {
    return { success: true, message: "Cliente editado exitosamente" };
  }

  try {
    return JSON.parse(responseText);
  } catch (e) {
    console.warn("La respuesta no es un JSON válido:", responseText);
    return { success: true, message: "Cliente editado exitosamente" };
  }
};

export const deleteClient = async (id, token, role) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Role": role,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al eliminar el cliente");
  }
  
  if (response.status === 204) {
    return { success: true, message: "Cliente eliminado exitosamente" };
  }

  return await response.json();
};

export default {
  getClients,
  createClient,
  updateClient,
  deleteClient,
};

const API_URL = "http://localhost:2023/api/clientes";

export const obtenerClientes = async (token, role) => {
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

export const crearCliente = async (cliente, token, role) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Role": role,
    },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al crear el cliente");
  }
  return await response.json();
};

export const editarCliente = async (cliente, token, role) => {
  const response = await fetch(`${API_URL}/${cliente._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Role": role,
    },
    body: JSON.stringify(cliente),
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

export const eliminarCliente = async (id, token, role) => {
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
  
  // Manejar respuesta vacía
  if (response.status === 204) {
    return { success: true, message: "Cliente eliminado exitosamente" };
  }

  return await response.json(); // En caso de que haya un mensaje en el cuerpo
};

export default {
  obtenerClientes,
  crearCliente,
  editarCliente,
  eliminarCliente,
};
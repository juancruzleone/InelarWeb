export const fetchProductos = async () => {
    const response = await fetch("http://localhost:2023/api/productos");
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    return response.json();
  };
  
  export const submitSolicitud = async (formData) => {
    const response = await fetch("http://localhost:2023/api/servicios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      const errors = {};
      errorData.errors.forEach((err) => {
        errors[err.field] = err.message;
      });
      throw errors;
    }
  };
  
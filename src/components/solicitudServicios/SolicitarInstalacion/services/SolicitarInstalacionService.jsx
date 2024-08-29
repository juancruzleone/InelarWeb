export const fetchProductos = async () => {
    const response = await fetch("https://inelarweb-back.onrender.com/api/productos");
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    return response.json();
  };
  
  export const submitSolicitud = async (formData) => {
    const response = await fetch("https://inelarweb-back.onrender.com/api/servicios", {
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
  
export const sendContactForm = async (formData) => {
    const response = await fetch("http://localhost:2023/api/contactos", {
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
      throw new Error(errors);
    }
  };
  
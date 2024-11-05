// useRegister.jsx
import { useState } from "react";
import { useRouter } from "next/router";
import { validateUsername, validateEmail, validatePassword } from "@/components/register/utils/ValidacionesRegistro";
import { registerUser } from "@/components/register/services/FetchRegistro";

const useRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", email: "", password: "", general: "" });
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setError((prev) => ({ ...prev, username: validateUsername(newUsername) }));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setError((prev) => ({ ...prev, email: validateEmail(newEmail) }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setError((prev) => ({ ...prev, password: validatePassword(newPassword) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (usernameError || emailError || passwordError) {
      setError({ username: usernameError, email: emailError, password: passwordError });
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      const data = await response.json();

      if (!response.ok) {
        if (data.error.message === "La cuenta ya existe") {
          setError((prev) => ({ ...prev, general: "La cuenta ya existe. Por favor, inicia sesión." }));
        } else if (data.error.details) {
          setError((prev) => ({ ...prev, general: data.error.details.join(', ') }));
        } else {
          setError((prev) => ({ ...prev, general: `Error en el registro: ${data.error.message}` }));
        }
        setIsLoading(false);
        return;
      }

      // Registro exitoso
      setModalMessage("Se ha enviado un correo de verificación. Por favor, verifica tu cuenta para activarla.");
      setShowModal(true);

      // Limpiar el formulario
      setUsername("");
      setEmail("");
      setPassword("");
      setError({ username: "", email: "", password: "", general: "" });

    } catch (error) {
      setError((prev) => ({ ...prev, general: "Error de red" }));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/login");
  };

  return {
    username,
    email,
    password,
    error,
    showModal,
    showPassword,
    modalMessage,
    isLoading,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    togglePasswordVisibility,
    closeModal,
  };
};

export default useRegister;
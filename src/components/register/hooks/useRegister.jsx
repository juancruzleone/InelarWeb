import { useState } from "react";
import { useRouter } from "next/router";
import { validateUsername, validateEmail, validatePassword } from "@/components/register/utils/ValidacionesRegistro";
import { registerUser, loginUser } from "@/components/register/services/FetchRegistro";

const useRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", email: "", password: "", general: "" });
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (usernameError || emailError || passwordError) {
      setError({ username: usernameError, email: emailError, password: passwordError });
      return;
    }

    try {
      const response = await registerUser({ username, email, password });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error.message === "cuenta ya existe") {
          setError((prev) => ({ ...prev, general: "La cuenta ya existe. Por favor, inicia sesión." }));
        } else if (errorData.error.details) {
          setError((prev) => ({ ...prev, general: errorData.error.details.join(', ') }));
        } else {
          setError((prev) => ({ ...prev, general: `Error en la solicitud: ${errorData.error.message}` }));
        }
        return;
      }

      const data = await response.json();
      setModalMessage(data.message || "Se ha enviado un correo de verificación. Por favor, verifica tu cuenta para activarla.");
      setShowModal(true);

    } catch (error) {
      setError((prev) => ({ ...prev, general: "Error de red" }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return {
    username,
    email,
    password,
    error,
    showModal,
    showPassword,
    modalMessage,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    togglePasswordVisibility,
    closeModal,
  };
};

export default useRegister;
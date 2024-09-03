import { useState } from "react";
import { useRouter } from "next/router";
import { validateUsername, validatePassword } from "@/components/register/utils/ValidacionesRegistro";
import { registerUser, loginUser } from "@/components/register/services/FetchRegistro";

const useRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", password: "", general: "" });
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setError((prev) => ({ ...prev, username: validateUsername(newUsername) }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setError((prev) => ({ ...prev, password: validatePassword(newPassword) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setError({ username: usernameError, password: passwordError });
      return;
    }

    try {
      const response = await registerUser({ username, password });

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

      const loginResponse = await loginUser({ username, password });

      if (!loginResponse.ok) {
        const loginErrorData = await loginResponse.json();
        setError((prev) => ({ ...prev, general: `Error en el inicio de sesión: ${loginErrorData.error.message}` }));
        return;
      }

      const loginData = await loginResponse.json();
      localStorage.setItem("userData", JSON.stringify(loginData));

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2000);

    } catch (error) {
      setError((prev) => ({ ...prev, general: "Error de red" }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/");
  };

  return {
    username,
    password,
    error,
    showModal,
    showPassword,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
    togglePasswordVisibility,
    closeModal,
  };
};

export default useRegister;

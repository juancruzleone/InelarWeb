import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "@/components/login/services/FetchLogin";
import { validateLoginFields } from "@/components/login/utils/ValidacionesLogin";

const useLoginState = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");

    const validationError = validateLoginFields(username, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = await loginUser(username, password);
      localStorage.setItem("userData", JSON.stringify(data));
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2000); 

    } catch (err) {
      setError(err.message === "Validation error" ? "Usuario o contraseña incorrectos." : `Error en la solicitud: ${err.message}`);
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
    setUsername,
    setPassword,
    handleSubmit,
    togglePasswordVisibility,
    closeModal,
  };
};

export default useLoginState;
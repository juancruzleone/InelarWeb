import { useState } from 'react';
import { submitMaintenanceForm } from '@/components/formularios/services/FormularioService';

export function useDeviceForm(installationId, deviceId) {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevData => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formState).forEach(key => {
      if (!formState[key]) {
        newErrors[key] = 'Este campo es requerido';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await submitMaintenanceForm(installationId, deviceId, formState);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('Error al enviar el formulario: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    handleInputChange,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit
  };
}
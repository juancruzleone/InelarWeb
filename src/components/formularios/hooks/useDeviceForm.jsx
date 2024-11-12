// useDeviceForm.jsx
import { useState, useEffect } from 'react';
import { submitMaintenanceForm } from '@/components/formularios/services/FormularioService';
import { validarCampo, validarFormulario } from '@//components/formularios/utils/Validaciones.jsx';

export function useDeviceForm(installationId, deviceId, formFields) {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isFormTouched) {
      const newErrors = validarFormulario(formState, formFields);
      setErrors(newErrors);
    }
  }, [formState, formFields, isFormTouched]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevData => ({ ...prevData, [name]: value }));
    if (!isFormTouched) {
      setIsFormTouched(true);
    }
  };

  const validateForm = () => {
    const newErrors = validarFormulario(formState, formFields);
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
    isFormTouched,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit
  };
}
import { useState } from 'react'
import { submitMaintenanceForm } from '@/services/deviceFormService'

export function useDeviceForm(installationId, deviceId) {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'Este campo es requerido'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      await submitMaintenanceForm(installationId, deviceId, formData)
      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError('Error al enviar el formulario')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    handleInputChange,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit
  }
}
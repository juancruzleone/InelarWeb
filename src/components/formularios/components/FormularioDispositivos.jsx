import { useState } from 'react'
import { submitMaintenanceForm } from '@/services/deviceFormService'
import styles from '@/styles/ListaDispositivos.module.css'

export default function FormularioDispositivos({ formData, installationId, deviceId }) {
  const [formState, setFormState] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      await submitMaintenanceForm(installationId, deviceId, formState)
      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError('Error al enviar el formulario')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.ModalPanelDispositivo}>
      <h1 className={styles.tituloPaginasPanel}>{formData.deviceName}</h1>
      <p className={styles.categoriaDispositivo}>Ubicación: {formData.deviceLocation}</p>
      <p className={styles.categoriaDispositivo}>Categoría: {formData.deviceCategory}</p>
      
      <form onSubmit={handleSubmit}>
        {formData.maintenanceFields.map(field => (
          <div key={field.id} className={styles.formularioPanel}>
            <label htmlFor={field.id}>
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              required={field.required}
              onChange={handleInputChange}
              className={styles.buscadorPanel}
            />
          </div>
        ))}
        
        <div className={styles.contenedorBotonesEditar}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.botonGuardar}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar formulario'}
          </button>
        </div>
      </form>

      {submitError && <p className={styles.error}>{submitError}</p>}
      {submitSuccess && <p className={styles.ModalExito}>Formulario enviado con éxito</p>}
    </div>
  )
}
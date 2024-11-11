import styles from '@/styles/ListaDispositivos.module.css'
import { useDeviceForm } from '@/components/formularios/hooks/useDeviceForm.jsx'

export default function DeviceForm({ formData, installationId, deviceId }) {
  const {
    formData: formState,
    handleInputChange,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit
  } = useDeviceForm(installationId, deviceId)

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
              value={formState[field.id] || ''}
              onChange={handleInputChange}
              required={field.required}
              className={styles.buscadorPanel}
            />
            {errors[field.id] && <span className={styles.error}>{errors[field.id]}</span>}
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
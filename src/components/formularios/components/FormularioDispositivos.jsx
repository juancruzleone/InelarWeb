// FormularioDispositivos.jsx
import { useState } from 'react';
import styles from '@/styles/ListaDispositivos.module.css';
import { useDeviceForm } from '@/components/formularios/hooks/useDeviceForm';

export default function FormularioDispositivo({ formData, installationId, deviceId }) {
  const {
    formState,
    handleInputChange,
    errors,
    isFormTouched,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit
  } = useDeviceForm(installationId, deviceId, formData.formFields);

  return (
    <div>
      <h1 className={styles.tituloPaginasPanel}>{formData.deviceInfo.nombre}</h1>
      <div className={styles.contenidoDispositivo}>
        <p className={styles.ubicacionDispositivo}>Ubicación: {formData.deviceInfo.ubicacion}</p>
        <p className={styles.categoriaDispositivoFormulario}>{formData.deviceInfo.categoria}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {formData.formFields.map(field => (
          <div key={field.name} className={styles.formularioPanel}>
            <label htmlFor={field.name} className={styles.posicionamientoLabel}>
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formState[field.name] || ''}
                onChange={handleInputChange}
                required={field.required}
                className={styles.buscadorPanel}
              >
                <option value="">Seleccione una opción</option>
                {field.options && field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formState[field.name] || ''}
                onChange={handleInputChange}
                required={field.required}
                className={styles.buscadorPanel}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formState[field.name] || ''}
                onChange={handleInputChange}
                required={field.required}
                className={styles.buscadorPanel}
              />
            )}
            {isFormTouched && errors[field.name] && (
              <span className={styles.error}>{errors[field.name]}</span>
            )}
          </div>
        ))}
        
        <div className={styles.contenedorBotonesFormulario}>
          <button
            type="submit"
            disabled={isSubmitting || (isFormTouched && Object.keys(errors).some(key => errors[key] !== ''))}
            className={styles.botonGuardar}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar formulario'}
          </button>
        </div>
      </form>

      {submitError && <p className={styles.error}>{submitError}</p>}
      {submitSuccess && <p className={styles.ModalExito}>Formulario enviado con éxito</p>}
    </div>
  );
}
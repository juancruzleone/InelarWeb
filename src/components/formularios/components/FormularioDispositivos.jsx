import { useState } from 'react';
import styles from '@/styles/ListaDispositivos.module.css';
import { useDeviceForm } from '@/components/formularios/hooks/useDeviceForm';

export default function FormularioDispositivo({ formData, installationId, deviceId }) {
  const {
    formState,
    handleInputChange,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit
  } = useDeviceForm(installationId, deviceId);

  return (
    <div className={styles.ModalPanelDispositivo}>
      <h1 className={styles.tituloPaginasPanel}>{formData.deviceInfo.nombre}</h1>
      <p className={styles.categoriaDispositivo}>Ubicación: {formData.deviceInfo.ubicacion}</p>
      <p className={styles.categoriaDispositivo}>Categoría: {formData.deviceInfo.categoria}</p>
      
      <form onSubmit={handleSubmit}>
        {formData.formFields.map(field => (
          <div key={field.name} className={styles.formularioPanel}>
            <label htmlFor={field.name}>
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formState[field.name] || ''}
                onChange={handleInputChange}
                required
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
                required
                className={styles.buscadorPanel}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formState[field.name] || ''}
                onChange={handleInputChange}
                required
                className={styles.buscadorPanel}
              />
            )}
            {errors[field.name] && <span className={styles.error}>{errors[field.name]}</span>}
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
  );
}
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import styles from '@/styles/ListaDispositivos.module.css';
import modalStyles from '@/styles/DetalleProducto.module.css';
import { submitMaintenanceForm } from '@/components/formularios/services/FormularioService';
import { validarFormulario } from '@/components/formularios/utils/Validaciones';

Modal.setAppElement('#__next');

const ModalConfirmacion = ({ isOpen, onRequestClose, mensaje }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Confirmación"
    className={`${modalStyles.Modal}`}
    shouldCloseOnOverlayClick={false}
    closeTimeoutMS={500}
  >
    <Image src="/tick.svg" alt="Operación realizada correctamente" width={40} height={40} className={modalStyles.tickModal} />
    <p>{mensaje}</p>
    <button onClick={onRequestClose} className={modalStyles.cerrarModalButton}>
      ❌
    </button>
  </Modal>
);

export default function FormularioDispositivo({ formData, installationId, deviceId }) {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (isFormTouched && formData) {
      const newErrors = validarFormulario(formState, formData.formFields);
      setErrors(newErrors);
    }
  }, [formState, formData, isFormTouched]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevData => ({ ...prevData, [name]: value }));
    if (!isFormTouched) {
      setIsFormTouched(true);
    }
  };

  const validateForm = () => {
    if (!formData) return false;
    const newErrors = validarFormulario(formState, formData.formFields);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitMaintenanceForm(installationId, deviceId, formState);
      setModalMessage('Formulario enviado con éxito');
      setIsModalOpen(true);
    } catch (error) {
      setSubmitError('Error al enviar el formulario: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitError) return <div>{submitError}</div>;
  if (!formData) return <div>No hay datos del formulario disponibles</div>;

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
      
      <ModalConfirmacion
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        mensaje={modalMessage}
      />
    </div>
  );
}
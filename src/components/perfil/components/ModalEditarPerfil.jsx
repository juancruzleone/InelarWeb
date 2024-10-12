import Modal from 'react-modal';
import styles from '@/styles/Perfil.module.css';
import { useEffect } from 'react';

const ModalEditarPerfil = ({ 
  showEditModal, 
  handleUserNameChange, 
  handleUpdateProfile, 
  error, 
  setShowEditModal, 
  newUserName 
}) => {
  
  useEffect(() => {
    if (showEditModal) {
      const modalContent = document.querySelector(`.${styles.ModalEditarPerfil}`);
      if (modalContent) {
        modalContent.style.overflowY = 'auto'; // Habilita el scroll vertical
      }
    }
  }, [showEditModal]);

  return (
    <Modal
      isOpen={showEditModal}
      onRequestClose={() => setShowEditModal(false)}
      contentLabel="Editar Perfil"
      className={styles.ModalEditarPerfil}
    >
      <h2>Editar Perfil</h2>
      {error && <p className={styles.error}>{error}</p>}
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        value={newUserName}
        onChange={handleUserNameChange}
        placeholder="Escribe nuevo nombre de usuario"
      />
      <div className={styles.contenedorBotonModalEditarPerfil}>
        <button onClick={handleUpdateProfile} className={styles.botonGuardarCambiosPerfil} disabled={!!error}>
          Guardar Cambios
        </button>
        <button onClick={() => setShowEditModal(false)} className={styles.botonCancelarCambiosPerfil}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalEditarPerfil;

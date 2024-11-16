import { useRouter } from 'next/router';
import { useModalConfirmacion } from './FormularioService';

export function ModalConfirmacion({ isOpen, onClose, mensaje }) {
  const router = useRouter();
  const { cerrarModalYPagina } = useModalConfirmacion(router);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        cerrarModalYPagina();
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [isOpen, cerrarModalYPagina]);

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <p>{mensaje}</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    )
  );
}
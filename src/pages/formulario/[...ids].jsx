import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getDeviceForm } from '@/components/formularios/services/FormularioService';
import FormularioDispositivo from '@/components/formularios/components/FormularioDispositivos';
import LoadingSpinner from '@/components/formularios/components/Cargando';
import ErrorMessage from '@/components/formularios/components/Error';
import styles from '@/styles/ListaDispositivos.module.css';

export default function PaginaFormularioDispositivo() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFormData() {
      try {
        // Esperar a que el router esté listo y tenga los parámetros
        if (!router.isReady) return;

        // Obtener el segmento de la URL después de /formulario/
        const pathSegments = router.asPath.split('/');
        const installationId = pathSegments[2];
        const deviceId = pathSegments[3];

        console.log('IDs extraídos:', { installationId, deviceId });

        if (!installationId || !deviceId) {
          throw new Error('URL inválida. Se requieren IDs de instalación y dispositivo.');
        }

        const data = await getDeviceForm(installationId, deviceId);
        setFormData(data);
      } catch (err) {
        console.error('Error al obtener el formulario:', err);
        setError(err.message || 'Error al cargar el formulario del dispositivo');
      } finally {
        setIsLoading(false);
      }
    }

    fetchFormData();
  }, [router.isReady, router.asPath]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!formData) return <ErrorMessage message="No se encontró el formulario del dispositivo" />;

  // Obtener los IDs de la URL para pasarlos al formulario
  const pathSegments = router.asPath.split('/');
  const installationId = pathSegments[2];
  const deviceId = pathSegments[3];

  return (
    <div className={styles.formularioPanel}>
      <FormularioDispositivo
        formData={formData}
        installationId={installationId}
        deviceId={deviceId}
      />
    </div>
  );
}
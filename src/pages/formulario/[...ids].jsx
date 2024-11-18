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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchFormData() {
      if (!router.isReady) return;

      const pathSegments = router.asPath.split('/');
      const installationId = pathSegments[2];
      const deviceId = pathSegments[3];

      if (!installationId || !deviceId) {
        setIsLoading(false);
        setError('IDs de instalación y dispositivo son requeridos');
        return;
      }

      try {
        const { data, userRole } = await getDeviceForm(installationId, deviceId);
        console.log('User role:', userRole);
        setIsAdmin(userRole === 'admin');

        if (userRole !== 'admin' || data.lastMaintenance) {
          if (data.lastMaintenance?.pdfUrl) {
            // Redirigir al usuario al PDF
            window.location.href = data.lastMaintenance.pdfUrl;
            return;
          } else {
            setError('No se encontró el PDF del último mantenimiento');
          }
        } else if (userRole === 'admin') {
          setFormData(data);
        }
      } catch (err) {
        console.error('Error al obtener el formulario:', err);
        setError('Error al cargar el formulario del dispositivo: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFormData();
  }, [router.isReady, router.asPath]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!isAdmin) return <ErrorMessage message="No tienes permisos para ver este formulario" />;
  if (!formData) return <ErrorMessage message="No se pudo cargar el formulario" />;

  return (
    <div className={styles.formularioPanel}>
      <FormularioDispositivo
        formData={formData}
        installationId={router.query.ids[0]}
        deviceId={router.query.ids[1]}
      />
    </div>
  );
}
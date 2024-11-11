import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getDeviceForm } from '@/components/formularios/services/FormularioService'
import FormularioDispositivo from '@/components/formularios/components/FormularioDispositivos'
import LoadingSpinner from '@/components/formularios/components/Cargando'
import ErrorMessage from '@/components/formularios/components/Error'
import styles from '@/styles/ListaDispositivos.module.css'

export default function PaginaFormularioDispositivo() {
  const router = useRouter()
  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFormData() {
      if (!router.isReady) return
      
      const pathSegments = router.query.ids
      if (!pathSegments || pathSegments.length !== 2) {
        setError('URL inválida')
        setIsLoading(false)
        return
      }

      const [installationId, deviceId] = pathSegments

      try {
        const data = await getDeviceForm(installationId, deviceId)
        setFormData(data)
      } catch (err) {
        console.error('Error fetching form:', err)
        setError('Error al cargar el formulario del dispositivo')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFormData()
  }, [router.isReady, router.query])

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!formData) return <ErrorMessage message="No se encontró el formulario del dispositivo" />

  const [installationId, deviceId] = router.query.ids || []

  return (
    <div className={styles.formularioPanel}>
      <FormularioDispositivo
        formData={formData}
        installationId={installationId}
        deviceId={deviceId}
      />
    </div>
  )
}
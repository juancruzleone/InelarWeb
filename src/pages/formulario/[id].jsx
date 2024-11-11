import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getDeviceForm } from '@/components/formularios/services/FormularioService'
import FormularioDispositivo from '@/components/formularios/components/FormularioDispositivo'
import LoadingSpinner from '@/components/formularios/components/Cargando'
import ErrorMessage from '@/components/formularios/components/Error'
import styles from '@/styles/ListaDispositivos.module.css'

export default function PaginaFormularioDispositivo() {
  const router = useRouter()
  const { id } = router.query
  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFormData() {
      if (typeof id === 'string') {
        const ids = id.split('/')
        if (ids.length !== 2) {
          setError('URL inválida. Se requiere ID de instalación y dispositivo')
          setIsLoading(false)
          return
        }

        try {
          const [installationId, deviceId] = ids
          const data = await getDeviceForm(installationId, deviceId)
          setFormData(data)
        } catch (err) {
          setError('Error al cargar el formulario del dispositivo')
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (id) {
      fetchFormData()
    }
  }, [id])

  useEffect(() => {
    if (typeof id === 'string' && !id.includes('/')) {
      router.push('/404')
    }
  }, [id, router])

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!formData) return <ErrorMessage message="No se encontró el formulario del dispositivo" />

  const [installationId, deviceId] = id.split('/')

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
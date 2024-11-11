import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getDeviceForm } from '@/services/deviceFormService'
import FormularioDispositivo from '@/components/formularios/components/FormularioDispositivos.jsx'
import Cargando from '@/components/formularios/components/Cargando.jsx'
import Error from '@/components/Error'
import styles from '@/styles/ListaDispositivos.module.css'

export default function FormularioDispositivo() {
  const router = useRouter()
  const { installationId, deviceId } = router.query
  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (installationId && deviceId) {
      fetchFormData()
    }
  }, [installationId, deviceId])

  const fetchFormData = async () => {
    try {
      const data = await getDeviceForm(installationId, deviceId)
      setFormData(data)
    } catch (err) {
      setError('Error al cargar el formulario del dispositivo')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Cargando />
  if (error) return <Error message={error} />
  if (!formData) return <Error message="No se encontró el formulario del dispositivo" />

  return (
    <div className={styles.formularioPanel}>
      <FormularioDispositivo formData={formData} installationId={installationId} deviceId={deviceId} />
    </div>
  )
}
import styles from '@/styles/ListaDispositivos.module.css'

export default function LoadingSpinner() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p className={styles.textoLoaderModal}>Cargando...</p>
    </div>
  )
}
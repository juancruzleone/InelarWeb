import styles from '@/styles/ListaDispositivos.module.css'

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.Modal}>
      <p className={styles.error}>{message}</p>
    </div>
  )
}
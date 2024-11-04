import { useTheme } from './ThemeProvider'
import styles from '@/styles/Nav.module.css'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} className={styles.themeToggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#F7931E" fill="none" width="40" height="40">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#F7931E" fill="none" width="40" height="40">
          <circle cx="12" cy="12" r="5" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="1" x2="12" y2="3" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="21" x2="12" y2="23" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="1" y1="12" x2="3" y2="12" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="21" y1="12" x2="23" y2="12" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}
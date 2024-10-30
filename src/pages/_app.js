import { useState, useEffect } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
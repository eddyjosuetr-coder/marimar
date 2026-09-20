import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import './index.css'
import './App.css'
import { Raiz } from './Raiz.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      El tema arranca siguiendo al sistema operativo y se guarda en cuanto el
      visitante elige. `disableTransitionOnChange` evita que las mil
      transiciones de color del sitio se disparen a la vez al alternar: el
      cambio se ve instantáneo en vez de como un barrido sucio.
    */}
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Raiz />
    </ThemeProvider>
  </StrictMode>,
)

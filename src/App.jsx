import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from './components/site/Header'
import Footer from './components/site/Footer'
import Preloader from './components/site/Preloader'
import PageTransition from './components/site/PageTransition'
import CustomCursor from './components/site/CustomCursor'
import { useLenis } from './lib/useLenis'
import Home from './pages/Home'

const Productos = lazy(() => import('./pages/Productos'))
const Oportunidad = lazy(() => import('./pages/Oportunidad'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Legal = lazy(() => import('./pages/Legal'))

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()

  return (
    <BrowserRouter>
      <div className="grain">
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
        <CustomCursor />
        <Header />
        <PageTransition>
          <main id="contenido">
            <Suspense fallback={<div className="min-h-[100dvh] bg-bg" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/oportunidad" element={<Oportunidad />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </PageTransition>
        <Toaster theme="dark" position="bottom-center" />
      </div>
    </BrowserRouter>
  )
}

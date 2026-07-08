import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/motion'

/**
 * Transición cortina: panel rojo→negro barre la pantalla al cambiar de ruta.
 * En reduce-motion: fade simple.
 */
export default function PageTransition({ children }) {
  const location = useLocation()
  const curtainRef = useRef(null)
  const contentRef = useRef(null)
  const firstRender = useRef(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (prefersReducedMotion()) {
      gsap.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      return
    }

    const tl = gsap.timeline()
    tl.set(curtainRef.current, { yPercent: 100, display: 'block' })
      .to(curtainRef.current, { yPercent: 0, duration: 0.35, ease: 'power3.in' })
      .fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.01 })
      .to(curtainRef.current, { yPercent: -100, duration: 0.45, ease: 'power3.out' })
      .set(curtainRef.current, { display: 'none' })

    return () => tl.kill()
  }, [location.pathname])

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-[80] hidden bg-gradient-to-b from-brand-2 via-bg-alt to-bg"
      />
      <div ref={contentRef}>{children}</div>
    </>
  )
}

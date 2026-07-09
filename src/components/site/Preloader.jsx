import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

/* Luxury loader: logo real de Miriam revelado con máscara + glow rojo,
   línea de progreso y salida en cortina. Total ~1.6 s. */
export default function Preloader({ onDone }) {
  const [gone, setGone] = useState(false)
  const rootRef = useRef(null)
  const logoRef = useRef(null)
  const glowRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setGone(true)
      onDone?.()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true)
        onDone?.()
      },
    })

    tl.fromTo(
      logoRef.current,
      {
        clipPath: 'inset(0% 100% 0% 0%)',
        filter: 'blur(14px)',
        scale: 1.08,
        opacity: 0.4,
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        filter: 'blur(0px)',
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.inOut',
      }
    )
      // Flare de glow rojo detrás del logo
      .fromTo(
        glowRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1.15, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.55'
      )
      .to(glowRef.current, { scale: 1, opacity: 0.55, duration: 0.35, ease: 'power2.inOut' })
      // Línea de progreso
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.85, ease: 'power2.inOut' },
        0.25
      )
      // Salida: logo respira y cortina sube
      .to(logoRef.current, { scale: 1.05, duration: 0.3, ease: 'power2.in' }, '-=0.1')
      .to(
        rootRef.current,
        { yPercent: -100, duration: 0.6, ease: 'power4.inOut' },
        '-=0.15'
      )

    return () => tl.kill()
  }, [onDone])

  if (gone) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-bg"
      aria-hidden="true"
    >
      {/* Atmósfera aurora tenue */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 55%, rgba(225,27,34,0.10), transparent 65%), radial-gradient(ellipse 45% 35% at 70% 30%, rgba(123,47,168,0.07), transparent 60%)',
        }}
      />

      {/* Glow flare detrás del logo */}
      <div
        ref={glowRef}
        className="absolute h-[420px] w-[680px] rounded-full opacity-0 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse, rgba(225,27,34,0.4), rgba(196,21,126,0.14) 55%, transparent 75%)',
        }}
      />

      <img
        ref={logoRef}
        src="/images/logo-mz-blanco.png"
        alt=""
        className="relative w-[78vw] max-w-md will-change-transform md:max-w-lg"
        width="880"
        height="560"
        fetchPriority="high"
      />

      <div className="relative mt-10 h-px w-56 overflow-hidden bg-line md:w-72">
        <div ref={barRef} className="h-full w-full origin-left bg-brand" />
      </div>
    </div>
  )
}

import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, isLowPowerViewport } from '../../lib/motion'
import { scrollToId } from '../../lib/useLenis'
import MagneticButton from '../effects/MagneticButton'
import { copy } from '../../data/copy'

gsap.registerPlugin(useGSAP)

const AuroraParticles = lazy(() => import('../three/AuroraParticles'))

export default function HeroSection() {
  const c = copy.home.hero
  const rootRef = useRef(null)
  const glowRef = useRef(null)
  const [show3d, setShow3d] = useState(false)

  // 3D post-LCP: solo desktop capaz, sin reduce-motion
  useEffect(() => {
    if (prefersReducedMotion() || isLowPowerViewport()) return
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200))
    const id = idle(() => setShow3d(true))
    return () => (window.cancelIdleCallback || clearTimeout)(id)
  }, [])

  useGSAP(
    (context, contextSafe) => {
      if (prefersReducedMotion()) return

      // Entrada: palabras del headline + retrato
      const tl = gsap.timeline({ delay: 1.3 })
      tl.fromTo(
        '.hero-word',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }
      )
        .fromTo('.hero-sub, .hero-ctas', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-portrait', { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }, 0.2)

      // Glow reactivo al mouse
      if (window.matchMedia('(pointer: fine)').matches) {
        const xTo = gsap.quickTo(glowRef.current, 'x', { duration: 0.6, ease: 'power2.out' })
        const yTo = gsap.quickTo(glowRef.current, 'y', { duration: 0.6, ease: 'power2.out' })
        const onMove = contextSafe((e) => {
          const r = rootRef.current.getBoundingClientRect()
          xTo(e.clientX - r.left - 300)
          yTo(e.clientY - r.top - 300)
        })
        rootRef.current.addEventListener('pointermove', onMove, { passive: true })
        return () => rootRef.current?.removeEventListener('pointermove', onMove)
      }
    },
    { scope: rootRef }
  )

  const words = c.headline.split(' ')

  return (
    <section
      ref={rootRef}
      className="bg-aurora relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* Glow que sigue al cursor */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(225,27,34,0.35), rgba(196,21,126,0.12) 55%, transparent 70%)',
        }}
      />

      {show3d && (
        <Suspense fallback={null}>
          <AuroraParticles />
        </Suspense>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pt-24 pb-12 md:grid-cols-2 md:px-8 md:pt-20 md:pb-0">
        {/* Texto */}
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="headline mt-6 text-[13vw] leading-[0.95] md:text-7xl lg:text-8xl">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                <span className={`hero-word inline-block will-change-transform ${
                  w === 'poder' ? 'text-brand text-glow' : ''
                }`}>
                  {w}
                  {i < words.length - 1 ? ' ' : ''}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-sub mt-6 max-w-md text-lg text-text-muted">{c.sub}</p>

          <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              as="button"
              type="button"
              onClick={() => scrollToId('productos-destacados')}
              className="rounded-full bg-brand px-7 py-4 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent glow-brand"
            >
              {c.ctaPrimario}
            </MagneticButton>
            <MagneticButton
              as="button"
              type="button"
              onClick={() => scrollToId('oportunidad')}
              className="rounded-full border border-line px-7 py-4 font-semibold text-text transition-colors duration-200 hover:border-brand hover:text-brand-accent"
            >
              {c.ctaSecundario}
            </MagneticButton>
          </div>
        </div>

        {/* Retrato con rim-light rojo */}
        <div className="hero-portrait relative mx-auto w-full max-w-md md:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 translate-y-8 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(225,27,34,0.4), rgba(123,47,168,0.15) 60%, transparent 75%)',
            }}
          />
          <img
            src="/images/miriam-bio.png"
            alt="Miriam Zuniga, líder y mentora en bienestar y longevidad"
            className="mx-auto max-h-[70dvh] w-auto object-contain drop-shadow-[0_0_45px_rgba(225,27,34,0.3)]"
            fetchPriority="high"
            width="1013"
            height="1520"
          />
        </div>
      </div>
    </section>
  )
}

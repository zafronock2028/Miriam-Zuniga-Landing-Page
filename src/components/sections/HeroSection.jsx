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

      const tl = gsap.timeline({ delay: 1.35 })
      // Logo de marca: revela con blur + glow que respira
      tl.fromTo(
        '.hero-logo',
        { y: 40, opacity: 0, filter: 'blur(16px)', scale: 1.12 },
        { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.1, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-word',
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power3.out' },
          '-=0.55'
        )
        .fromTo(
          '.hero-sub, .hero-ctas',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          '-=0.5'
        )

      // Pulso de glow permanente en el logo, muy sutil
      gsap.to('.hero-logo', {
        filter: 'drop-shadow(0 0 32px rgba(225,27,34,0.55))',
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.6,
      })

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
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* Video background con capa de marca */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,12,0.72) 0%, rgba(10,10,12,0.55) 45%, rgba(10,10,12,0.9) 100%), radial-gradient(ellipse 70% 55% at 50% 40%, rgba(225,27,34,0.16), rgba(123,47,168,0.08) 60%, transparent 75%)',
        }}
      />

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

      {/* Contenido centrado */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pt-20 pb-16 text-center md:px-8">
        {/* Logo de marca personal, protagonista sobre el headline */}
        <img
          src="/images/logo-mz-blanco.png"
          alt="Miriam Zuniga. Libertad, liderazgo, visión, impacto."
          className="hero-logo mx-auto w-[70vw] max-w-sm drop-shadow-[0_0_24px_rgba(225,27,34,0.35)] md:max-w-md"
          width="880"
          height="560"
          fetchPriority="high"
        />
        <h1 className="headline mt-8 text-[13vw] leading-[0.95] md:text-8xl lg:text-9xl">
          {words.map((w, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom"
            >
              <span
                className={`hero-word inline-block will-change-transform ${
                  w === 'poder' ? 'text-brand text-glow' : ''
                }`}
              >
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-sub mx-auto mt-8 max-w-xl text-lg text-text-muted md:text-xl">
          {c.sub}
        </p>

        <div className="hero-ctas mt-10 flex flex-wrap items-center justify-center gap-4">
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
            className="rounded-full border border-text/25 bg-bg/30 px-7 py-4 font-semibold text-text backdrop-blur-sm transition-colors duration-200 hover:border-brand hover:text-brand-accent"
          >
            {c.ctaSecundario}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

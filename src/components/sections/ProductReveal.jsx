import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import MagneticButton from '../effects/MagneticButton'
import { featuredProducts } from '../../data/products'
import { quickWhatsAppUrl } from '../../lib/whatsapp'

gsap.registerPlugin(useGSAP)

/* Product reveal pinned: los 5 productos se suceden mientras la
   sección queda fija. Cada producto entra con rotación + escala,
   su texto sube en cascada y sale hacia arriba al llegar el siguiente. */
export default function ProductReveal() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const slides = gsap.utils.toArray('.pr-slide')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: `+=${slides.length * 1100}`,
          pin: true,
          scrub: 1,
        },
      })

      slides.forEach((slide, i) => {
        const img = slide.querySelector('.pr-img')
        const glow = slide.querySelector('.pr-glow')
        const textos = slide.querySelectorAll('.pr-text')

        // Entrada
        tl.fromTo(
          slide,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35, ease: 'none' },
          i === 0 ? 0 : '<+0.35'
        )
          .fromTo(
            img,
            { scale: 0.55, rotate: i % 2 === 0 ? -14 : 14, yPercent: 18 },
            { scale: 1, rotate: 0, yPercent: 0, duration: 0.9, ease: 'none' },
            '<'
          )
          .fromTo(glow, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'none' }, '<')
          .fromTo(
            textos,
            { yPercent: 60, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'none' },
            '<+0.25'
          )

        // Pausa de lectura
        tl.to({}, { duration: 0.7 })

        // Salida (excepto el último)
        if (i < slides.length - 1) {
          tl.to(img, { scale: 1.25, rotate: i % 2 === 0 ? 8 : -8, yPercent: -22, duration: 0.7, ease: 'none' })
            .to(textos, { yPercent: -50, opacity: 0, duration: 0.5, ease: 'none' }, '<')
            .to(slide, { autoAlpha: 0, duration: 0.35, ease: 'none' }, '<+0.2')
        }
      })
    },
    { scope: rootRef }
  )

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100dvh] overflow-hidden"
      aria-label="Los cinco productos destacados de Higo Global"
    >
      {/* Atmósfera aurora de fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 30% 50%, rgba(225,27,34,0.12), transparent 65%), radial-gradient(ellipse 40% 40% at 75% 60%, rgba(123,47,168,0.08), transparent 60%)',
        }}
      />

      {featuredProducts.map((p, i) => (
        <div
          key={p.id}
          className={`pr-slide absolute inset-0 flex items-center ${i > 0 ? 'invisible opacity-0' : ''}`}
        >
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-5 py-20 md:grid-cols-2 md:gap-10 md:px-8">
            <div className="relative mx-auto w-full max-w-[260px] md:max-w-sm">
              <div
                className="pr-glow absolute inset-0 -z-10 rounded-full blur-3xl"
                aria-hidden="true"
                style={{
                  background: 'radial-gradient(circle, rgba(225,27,34,0.38), rgba(123,47,168,0.15) 60%, transparent 75%)',
                }}
              />
              <img
                className="pr-img w-full drop-shadow-2xl will-change-transform"
                src={p.imagen}
                alt={p.nombre}
                loading="lazy"
                width="800"
                height="800"
              />
            </div>

            <div>
              <p className="pr-text font-mono text-sm text-brand-accent">
                {String(i + 1).padStart(2, '0')} / 05 · {p.categoria}
              </p>
              <h3 className="pr-text headline mt-4 text-4xl md:text-6xl">{p.nombre}</h3>
              <p className="pr-text mt-5 max-w-md text-lg leading-relaxed text-text-muted">
                {p.resumen}
              </p>
              <p className="pr-text mt-3 max-w-md text-text-faint">{p.para}</p>
              <div className="pr-text mt-8">
                <MagneticButton
                  as="a"
                  href={quickWhatsAppUrl(`Hola Miriam, quiero probar ${p.nombre}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-brand px-7 py-4 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent glow-brand"
                >
                  Pedir por WhatsApp
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

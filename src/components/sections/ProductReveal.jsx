import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import MagneticButton from '../effects/MagneticButton'
import { copy } from '../../data/copy'
import { heroProduct } from '../../data/products'
import { quickWhatsAppUrl } from '../../lib/whatsapp'

gsap.registerPlugin(useGSAP)

/* Product reveal pinned: el producto queda fijo mientras las fases
   ingrediente → beneficio → resultado se suceden con el scroll. */
export default function ProductReveal() {
  const c = copy.home.reveal
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const fases = gsap.utils.toArray('.reveal-fase')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 1,
        },
      })

      // Producto: entra rotando levemente, luego respira
      tl.fromTo(
        '.reveal-product',
        { scale: 0.7, rotate: -6, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: 'none' }
      )

      fases.forEach((fase, i) => {
        tl.fromTo(
          fase,
          { yPercent: 30, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: 'none' },
          i === 0 ? '-=0.3' : '+=0.3'
        )
        if (i < fases.length - 1) {
          tl.to(fase, { yPercent: -30, opacity: 0, duration: 0.8, ease: 'none' }, '+=0.6')
        }
      })

      tl.fromTo('.reveal-cta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'none' }, '-=0.2')
    },
    { scope: rootRef }
  )

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
      aria-label={`Descubre ${heroProduct.nombre}`}
    >
      {/* Glow de fondo, familia aurora */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 30% 50%, rgba(225,27,34,0.12), transparent 65%), radial-gradient(ellipse 40% 40% at 75% 60%, rgba(123,47,168,0.08), transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-24 md:grid-cols-2 md:px-8">
        <div className="reveal-product relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-90 rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(225,27,34,0.35), transparent 70%)' }}
          />
          <img
            src={heroProduct.imagen}
            alt={heroProduct.nombre}
            className="w-full drop-shadow-2xl"
            loading="lazy"
            width="800"
            height="800"
          />
        </div>

        <div className="relative min-h-[280px] md:min-h-[320px]">
          <p className="eyebrow">{heroProduct.nombre}</p>

          <div className="relative mt-8">
            {c.pasos.map((paso) => (
              <div key={paso.fase} className="reveal-fase absolute inset-x-0 top-0">
                <h3 className="headline text-4xl md:text-5xl">{paso.fase}</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-text-muted">
                  {paso.texto}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal-cta absolute bottom-0 left-0">
            <MagneticButton
              as="a"
              href={quickWhatsAppUrl(`Hola Miriam, quiero probar ${heroProduct.nombre}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-brand px-7 py-4 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent glow-brand"
            >
              {c.cta}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}

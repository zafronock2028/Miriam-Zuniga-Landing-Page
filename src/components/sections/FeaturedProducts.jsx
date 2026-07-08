import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import FadeUp from '../effects/FadeUp'
import SplitReveal from '../effects/SplitReveal'
import { featuredProducts } from '../../data/products'
import { quickWhatsAppUrl } from '../../lib/whatsapp'

gsap.registerPlugin(useGSAP)

function ProductCard({ p }) {
  const cardRef = useRef(null)

  useGSAP(
    (context, contextSafe) => {
      if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
      const el = cardRef.current
      if (!el) return

      const onMove = contextSafe((e) => {
        const r = el.getBoundingClientRect()
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -8
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 8
        gsap.to(el, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 800,
          duration: 0.4,
          ease: 'power2.out',
        })
      })
      const onLeave = contextSafe(() => {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
      })

      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: cardRef }
  )

  return (
    <article
      ref={cardRef}
      className="group relative flex flex-col overflow-hidden rounded-2xl border hairline bg-bg-alt p-6 will-change-transform"
    >
      <div className="relative mx-auto aspect-square w-full max-w-[240px]">
        <div
          aria-hidden="true"
          className="absolute inset-4 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(20,128,143,0.35), transparent 70%)' }}
        />
        <img
          src={p.imagen}
          alt={p.nombre}
          className="relative h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width="480"
          height="480"
        />
      </div>

      <p className="eyebrow mt-6 !text-[10px]" style={{ color: 'var(--color-higo-teal)' }}>
        {p.categoria}
      </p>
      <h3 className="font-display mt-2 text-2xl font-bold">{p.nombre}</h3>
      <p className="mt-2 text-sm text-text-muted">{p.beneficios[0]}</p>
      <p className="mt-1 text-sm text-text-faint">{p.para}</p>

      <a
        href={quickWhatsAppUrl(`Hola Miriam, me interesa ${p.nombre}. ¿Me cuentas más?`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 py-3 text-sm font-semibold transition-all duration-200 hover:border-brand hover:bg-brand hover:text-text"
      >
        Pedir por WhatsApp
      </a>
    </article>
  )
}

export default function FeaturedProducts() {
  return (
    <section id="productos-destacados" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SplitReveal as="h2" className="headline max-w-3xl text-4xl md:text-6xl">
          Fórmulas para tu evolución
        </SplitReveal>

        <FadeUp
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          stagger={0.08}
        >
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </FadeUp>
      </div>
    </section>
  )
}

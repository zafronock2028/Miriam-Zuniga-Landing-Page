import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

gsap.registerPlugin(useGSAP)

/* Mi testimonio: sección pinned inmersiva. Collage "antes" en gris entra
   por capas, palabra gigante de fondo ANTES→HOY, barrido rojo revela el
   "después" a color, y el testimonio de Miriam se narra por etapas. */

const ANTES = ['/images/antes-1.jpg', '/images/antes-2.jpg', '/images/antes-3b.jpg']
const DESPUES = ['/images/despues-1.jpg', '/images/despues-2.jpg', '/images/despues-3.jpg']

const ETAPAS = [
  'Hace nueve meses decidí hacer un cambio en mi estilo de vida y comencé a incorporar los productos HiGO como parte de esa decisión.',
  'Soy diabética y, junto con el seguimiento de mi médico y mis nuevos hábitos, hoy mi diabetes está mucho más controlada.',
  'Mi energía ha aumentado de una manera increíble. Después de tener a mi último bebé, logré un cambio físico que jamás imaginé.',
  'Cada día me siento mejor que el anterior. Hoy disfruto de una mejor calidad de vida y sigo avanzando, un día a la vez.',
]

export default function TestimonioMiriamSection() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=4200',
          pin: true,
          scrub: 1,
        },
      })

      // Palabra gigante ANTES aparece detrás
      tl.fromTo(
        '.tm-word-antes',
        { opacity: 0, scale: 1.3 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'none' }
      )

      // Fotos "antes" entran en cascada, grises, con rotaciones
      gsap.utils.toArray('.tm-antes').forEach((el, i) => {
        tl.fromTo(
          el,
          { yPercent: 130, rotate: i % 2 === 0 ? -10 : 10, opacity: 0 },
          { yPercent: 0, rotate: (i - 1) * 5, opacity: 1, duration: 0.7, ease: 'none' },
          `-=${i === 0 ? 0.3 : 0.45}`
        )
      })

      // Etapa 1 y 2 del relato
      tl.fromTo('.tm-etapa-0', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'none' })
        .to({}, { duration: 0.8 })
        .to('.tm-etapa-0', { y: -50, opacity: 0, duration: 0.5, ease: 'none' })
        .fromTo('.tm-etapa-1', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'none' })
        .to({}, { duration: 0.8 })
        .to('.tm-etapa-1', { y: -50, opacity: 0, duration: 0.5, ease: 'none' })

      // Barrido rojo: cortina que cruza y transforma ANTES → HOY
      tl.fromTo(
        '.tm-sweep',
        { xPercent: -110 },
        { xPercent: 110, duration: 1.2, ease: 'none' }
      )
        .to('.tm-word-antes', { opacity: 0, duration: 0.3, ease: 'none' }, '<+0.35')
        .fromTo(
          '.tm-word-hoy',
          { opacity: 0, scale: 1.3 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'none' },
          '<+0.2'
        )
        .to('.tm-grid-antes', { opacity: 0, scale: 0.92, duration: 0.4, ease: 'none' }, '<-0.25')

      // Fotos "después" a color entran con energía
      gsap.utils.toArray('.tm-despues').forEach((el, i) => {
        tl.fromTo(
          el,
          { yPercent: 130, rotate: i % 2 === 0 ? 12 : -12, opacity: 0, scale: 1.1 },
          { yPercent: 0, rotate: (1 - i) * 4, opacity: 1, scale: 1, duration: 0.7, ease: 'none' },
          `-=${i === 0 ? 0.2 : 0.45}`
        )
      })

      // Etapas 3 y 4
      tl.fromTo('.tm-etapa-2', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'none' })
        .to({}, { duration: 0.8 })
        .to('.tm-etapa-2', { y: -50, opacity: 0, duration: 0.5, ease: 'none' })
        .fromTo('.tm-etapa-3', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'none' })
        .to({}, { duration: 1 })
    },
    { scope: rootRef }
  )

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100dvh] overflow-hidden"
      aria-label="El testimonio de transformación de Miriam"
    >
      {/* Atmósfera */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(225,27,34,0.10), transparent 65%), radial-gradient(ellipse 45% 40% at 80% 70%, rgba(123,47,168,0.07), transparent 60%)',
        }}
      />

      {/* Palabras gigantes de fondo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span
          className="tm-word-antes headline absolute text-[24vw] text-text/5 md:text-[18vw]"
          style={{ WebkitTextStroke: '1px rgba(245,245,247,0.14)' }}
        >
          ANTES
        </span>
        <span
          className="tm-word-hoy headline absolute text-[24vw] opacity-0 md:text-[18vw]"
          style={{ WebkitTextStroke: '1px rgba(225,27,34,0.5)', color: 'rgba(225,27,34,0.08)' }}
        >
          HOY
        </span>
      </div>

      {/* Cortina de barrido rojo */}
      <div
        aria-hidden="true"
        className="tm-sweep absolute inset-y-0 -left-1/4 w-1/2 -skew-x-12 opacity-90"
        style={{
          transform: 'translateX(-110%)',
          background:
            'linear-gradient(90deg, transparent, rgba(225,27,34,0.85) 45%, rgba(255,59,65,0.95) 55%, transparent)',
          filter: 'blur(2px)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1400px] flex-col justify-between px-5 py-24 md:px-8">
        <div className="text-center">
          <p className="eyebrow">MI TESTIMONIO</p>
          <h2 className="headline mt-4 text-3xl md:text-5xl">
            Quiero compartir <span className="text-brand">mi experiencia</span>
          </h2>
        </div>

        {/* Collages */}
        <div className="relative mx-auto mt-8 h-[46dvh] w-full max-w-3xl md:h-[50dvh]">
          <div className="tm-grid-antes absolute inset-0 flex items-center justify-center gap-4 md:gap-6">
            {ANTES.map((src, i) => (
              <div
                key={src}
                className="tm-antes w-1/3 max-w-[220px] overflow-hidden rounded-xl border hairline shadow-2xl will-change-transform"
              >
                <img
                  src={src}
                  alt={`Miriam antes de su transformación, foto ${i + 1}`}
                  className="aspect-[3/4] w-full object-cover object-top grayscale"
                  loading="lazy"
                  width="440"
                  height="586"
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center gap-4 md:gap-6">
            {DESPUES.map((src, i) => (
              <div
                key={src}
                className="tm-despues w-1/3 max-w-[220px] overflow-hidden rounded-xl border border-brand/30 opacity-0 shadow-[0_20px_60px_-15px_rgba(225,27,34,0.35)] will-change-transform"
              >
                <img
                  src={src}
                  alt={`Miriam hoy, después de su transformación, foto ${i + 1}`}
                  className="aspect-[3/4] w-full object-cover object-top"
                  loading="lazy"
                  width="440"
                  height="586"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Relato por etapas */}
        <div className="relative mx-auto mt-8 h-32 w-full max-w-2xl text-center md:h-28">
          {ETAPAS.map((texto, i) => (
            <p
              key={i}
              className={`tm-etapa-${i} absolute inset-x-0 top-0 font-serif-accent text-lg leading-relaxed text-text italic opacity-0 md:text-xl`}
            >
              “{texto}”
            </p>
          ))}
          <p className="absolute inset-x-0 bottom-0 font-mono text-[10px] tracking-widest text-text-faint uppercase">
            Miriam Zuniga · resultados junto a seguimiento médico y nuevos hábitos
          </p>
        </div>
      </div>
    </section>
  )
}

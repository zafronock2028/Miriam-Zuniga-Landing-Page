import SplitReveal from '../effects/SplitReveal'
import { copy } from '../../data/copy'

/* Testimonios reales (capturas). Marquee lento en dos filas opuestas.
   Reduce-motion: filas estáticas con scroll horizontal nativo. */

const FILA_A = [1, 3, 5, 7, 9, 11, 13, 15]
const FILA_B = [2, 4, 6, 8, 10, 12, 14, 16]

function Fila({ ids, reverse = false }) {
  const imgs = [...ids, ...ids] // loop seamless

  return (
    <div className="marquee-mask overflow-x-auto md:overflow-hidden">
      <div
        className={`flex w-max gap-4 py-2 ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}
      >
        {imgs.map((n, i) => (
          <img
            key={`${n}-${i}`}
            src={`/testimonios/testimonio-${n}.jpg`}
            alt={i < ids.length ? `Testimonio real ${n} de la comunidad de Miriam` : ''}
            aria-hidden={i >= ids.length}
            className="h-64 w-auto rounded-xl border hairline object-cover md:h-72"
            loading="lazy"
            height="288"
          />
        ))}
      </div>
    </div>
  )
}

export default function TestimoniosSection() {
  const c = copy.home.testimonios

  return (
    <section className="overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SplitReveal as="h2" className="headline max-w-2xl text-4xl md:text-6xl">
          {c.headline}
        </SplitReveal>
        <p className="mt-4 text-text-muted">{c.sub}</p>
      </div>

      <div className="mt-14 space-y-4">
        <Fila ids={FILA_A} />
        <Fila ids={FILA_B} reverse />
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) and (min-width: 768px) {
          .marquee-track { animation: marquee 55s linear infinite; }
          .marquee-track-reverse { animation: marquee 65s linear infinite reverse; }
          .marquee-mask:hover .marquee-track,
          .marquee-mask:hover .marquee-track-reverse { animation-play-state: paused; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

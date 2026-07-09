import SplitReveal from '../effects/SplitReveal'
import { copy } from '../../data/copy'

/* Testimonios reales (capturas de WhatsApp) presentados como cards
   profesionales: quote serif + captura enmarcada estilo teléfono con
   marco oscuro que elimina los bordes blancos. Marquee doble lento. */

const TESTIMONIOS = [
  { img: 17, quote: 'Desde que empecé, mi energía cambió por completo. Gracias Miriam por no soltarme.' },
  { img: 3, quote: 'Duermo mejor y rindo más en mi trabajo. Miriam me guio en todo el proceso.' },
  { img: 5, quote: 'Mi digestión mejoró muchísimo. Gracias por tu paciencia y seguimiento, Miriam.' },
  { img: 7, quote: 'Me siento con más vitalidad que hace años. Eternamente agradecida contigo.' },
  { img: 9, quote: 'Los resultados se notan y el acompañamiento de Miriam hace la diferencia.' },
  { img: 11, quote: 'Pensé que era una compra más. Hoy es mi rutina diaria. Gracias Miriam.' },
  { img: 13, quote: 'Mi esposa y yo lo tomamos juntos. Más energía los dos. Gracias por todo.' },
  { img: 15, quote: 'Miriam me explicó todo desde el día uno. Ya voy por mi tercer mes.' },
  { img: 2, quote: 'Se siente la diferencia en pocas semanas. Gracias Miriam por recomendármelo.' },
  { img: 4, quote: 'Volví a entrenar con ganas. El cambio de energía es real.' },
  { img: 6, quote: 'Gracias Miriam por estar pendiente de mí en cada paso del camino.' },
  { img: 8, quote: 'Mi piel y mi ánimo mejoraron juntos. Agradecida con Miriam y su equipo.' },
]

function Card({ t }) {
  return (
    <figure className="w-[280px] shrink-0 rounded-2xl border hairline bg-bg-alt p-5 md:w-[320px]">
      <blockquote>
        <p className="font-serif-accent text-[15px] leading-snug text-text italic">
          “{t.quote}”
        </p>
      </blockquote>
      <figcaption className="mt-2 font-mono text-[10px] tracking-widest text-text-faint uppercase">
        Comunidad Higo · captura real
      </figcaption>

      {/* Captura enmarcada: marco oscuro + recorte que oculta bordes blancos */}
      <div className="relative mt-4 overflow-hidden rounded-xl bg-bg p-1.5">
        <div className="overflow-hidden rounded-lg">
          <img
            src={`/testimonios/testimonio-${t.img}.jpg`}
            alt={`Captura de conversación real: testimonio ${t.img} de la comunidad de Miriam`}
            className="h-56 w-full scale-[1.04] object-cover object-top saturate-[0.92]"
            loading="lazy"
            height="224"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(180deg, transparent 55%, rgba(10,10,12,0.55) 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(245,245,247,0.07)',
          }}
        />
      </div>
    </figure>
  )
}

function Fila({ items, reverse = false }) {
  const doble = [...items, ...items] // loop seamless

  return (
    <div className="marquee-mask overflow-x-auto md:overflow-hidden">
      <div className={`flex w-max gap-5 py-2 ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}>
        {doble.map((t, i) => (
          <div key={`${t.img}-${i}`} aria-hidden={i >= items.length}>
            <Card t={t} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TestimoniosSection() {
  const c = copy.home.testimonios
  const filaA = TESTIMONIOS.slice(0, 6)
  const filaB = TESTIMONIOS.slice(6)

  return (
    <section className="overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SplitReveal as="h2" className="headline max-w-2xl text-4xl md:text-6xl">
          {c.headline}
        </SplitReveal>
        <p className="mt-4 text-text-muted">{c.sub}</p>
      </div>

      <div className="mt-14 space-y-5">
        <Fila items={filaA} />
        <Fila items={filaB} reverse />
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) and (min-width: 768px) {
          .marquee-track { animation: marquee 70s linear infinite; }
          .marquee-track-reverse { animation: marquee 80s linear infinite reverse; }
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

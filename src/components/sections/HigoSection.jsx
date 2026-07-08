import FadeUp from '../effects/FadeUp'
import SplitReveal from '../effects/SplitReveal'
import Counter from '../effects/Counter'
import { copy } from '../../data/copy'

/* Cobranding Higo Global: único módulo con teal/verde. Sin rojo aquí. */
export default function HigoSection() {
  const c = copy.home.higo

  return (
    <section id="higo" className="bg-higo relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <FadeUp className="flex justify-center md:justify-start">
            <img
              src="/images/logo-higo-completo.png"
              alt="Higo Global, productos de longevidad y bienestar"
              className="w-full max-w-xs md:max-w-sm"
              loading="lazy"
              width="480"
              height="480"
            />
          </FadeUp>

          <div>
            <p className="eyebrow" style={{ color: 'var(--color-higo-teal)' }}>
              {c.eyebrow}
            </p>
            <SplitReveal as="h2" className="headline mt-6 text-4xl md:text-6xl">
              {c.headline}
            </SplitReveal>
            <FadeUp>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">{c.body}</p>
            </FadeUp>

            <FadeUp className="mt-12 grid grid-cols-3 gap-6" stagger={0.1}>
              {c.datos.map((d) => (
                <div key={d.label} className="border-l pl-4" style={{ borderColor: 'rgba(20,128,143,0.4)' }}>
                  <Counter
                    value={d.numero}
                    className="font-mono text-5xl font-bold md:text-6xl"
                  />
                  <p className="mt-2 text-sm text-text-muted">{d.label}</p>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

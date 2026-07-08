import SplitReveal from '../effects/SplitReveal'
import FadeUp from '../effects/FadeUp'
import { copy } from '../../data/copy'

/* Numbered manifesto rows: 01–04, números gigantes como pieza visual. */
export default function BeneficiosSection() {
  const c = copy.home.beneficios

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SplitReveal as="h2" className="headline max-w-2xl text-4xl md:text-6xl">
          {c.headline}
        </SplitReveal>

        <div className="mt-16">
          {c.items.map((item, i) => (
            <FadeUp
              key={item.n}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-t hairline py-8 transition-colors duration-300 hover:bg-bg-alt/50 md:grid-cols-[120px_1fr_1.5fr] md:gap-10 md:py-10"
              delay={i * 0.05}
            >
              <span className="font-mono text-4xl font-bold text-brand transition-transform duration-300 group-hover:-translate-y-1 md:text-6xl">
                {item.n}
              </span>
              <h3 className="font-display text-2xl font-bold md:text-3xl">{item.titulo}</h3>
              <p className="col-span-2 text-text-muted md:col-span-1 md:text-lg">{item.texto}</p>
            </FadeUp>
          ))}
          <div className="border-t hairline" />
        </div>
      </div>
    </section>
  )
}

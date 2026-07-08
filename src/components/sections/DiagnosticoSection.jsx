import SplitReveal from '../effects/SplitReveal'
import FadeUp from '../effects/FadeUp'
import { copy } from '../../data/copy'

/* Diagnóstico corto: 3 preguntas tipo pill. Estado vive en Home
   y viaja al mensaje de WhatsApp. */
export default function DiagnosticoSection({ respuestas, onChange }) {
  const c = copy.home.diagnostico

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SplitReveal as="h2" className="headline text-center text-4xl md:text-5xl">
          {c.headline}
        </SplitReveal>

        <FadeUp className="mt-14 space-y-10" stagger={0.1}>
          {c.preguntas.map((q) => (
            <fieldset key={q.id}>
              <legend className="font-display text-xl font-bold">{q.pregunta}</legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {q.opciones.map((op) => {
                  const active = respuestas[q.id] === op
                  return (
                    <button
                      key={op}
                      type="button"
                      onClick={() => onChange(q.id, active ? null : op)}
                      aria-pressed={active}
                      className={`min-h-11 rounded-full border px-5 py-2.5 text-sm transition-all duration-200 ${
                        active
                          ? 'border-brand bg-brand font-semibold text-text glow-brand'
                          : 'border-line text-text-muted hover:border-brand-accent hover:text-text'
                      }`}
                    >
                      {op}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </FadeUp>
      </div>
    </section>
  )
}

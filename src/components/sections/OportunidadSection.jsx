import SplitReveal from '../effects/SplitReveal'
import FadeUp from '../effects/FadeUp'
import MaskImage from '../effects/MaskImage'
import MagneticButton from '../effects/MagneticButton'
import { copy } from '../../data/copy'
import { scrollToId } from '../../lib/useLenis'

export default function OportunidadSection() {
  const c = copy.home.oportunidad

  return (
    <section id="oportunidad" className="bg-aurora relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="eyebrow">{c.eyebrow}</p>
            <SplitReveal as="h2" className="headline mt-6 text-4xl md:text-6xl">
              {c.headline}
            </SplitReveal>
            <FadeUp>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">{c.body}</p>
            </FadeUp>

            <FadeUp className="mt-10 space-y-6" stagger={0.1}>
              {c.puntos.map((p) => (
                <div key={p.titulo} className="flex gap-4">
                  <span aria-hidden="true" className="mt-2 h-px w-8 shrink-0 bg-brand" />
                  <div>
                    <h3 className="font-display text-xl font-bold">{p.titulo}</h3>
                    <p className="mt-1 text-text-muted">{p.texto}</p>
                  </div>
                </div>
              ))}
            </FadeUp>

            <FadeUp className="mt-10">
              <MagneticButton
                as="button"
                type="button"
                onClick={() => scrollToId('formulario')}
                className="rounded-full bg-brand px-7 py-4 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent glow-brand"
              >
                {c.cta}
              </MagneticButton>
            </FadeUp>
          </div>

          <MaskImage
            src="/images/miriam-despedida.jpg"
            alt="Miriam Zuniga invitándote a construir tu propio camino"
            className="aspect-[4/5] rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}

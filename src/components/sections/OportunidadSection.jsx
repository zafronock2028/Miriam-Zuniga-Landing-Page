import SplitReveal from '../effects/SplitReveal'
import FadeUp from '../effects/FadeUp'
import MagneticButton from '../effects/MagneticButton'
import { copy } from '../../data/copy'
import { scrollToId } from '../../lib/useLenis'
import { REGISTRO_URL } from '../../lib/whatsapp'

export default function OportunidadSection() {
  const c = copy.home.oportunidad

  return (
    <section id="oportunidad" className="relative overflow-hidden py-28 md:py-44">
      {/* Foto de Miriam como background de la sección */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/miriam-despedida.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,12,0.94) 0%, rgba(10,10,12,0.82) 45%, rgba(10,10,12,0.45) 100%), radial-gradient(ellipse 60% 50% at 20% 30%, rgba(225,27,34,0.14), transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="max-w-2xl">
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

          <FadeUp className="mt-10 flex flex-wrap gap-4">
            <MagneticButton
              as="button"
              type="button"
              onClick={() => scrollToId('formulario')}
              className="rounded-full bg-brand px-7 py-4 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent glow-brand"
            >
              {c.cta}
            </MagneticButton>
            <MagneticButton
              as="a"
              href={REGISTRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-text/25 bg-bg/40 px-7 py-4 font-semibold text-text backdrop-blur-sm transition-colors duration-200 hover:border-brand hover:text-brand-accent"
            >
              Registrarme ahora
            </MagneticButton>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

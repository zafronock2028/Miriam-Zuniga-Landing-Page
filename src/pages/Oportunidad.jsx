import { copy } from '../data/copy'
import { useSeo } from '../lib/seo'
import { scrollToId } from '../lib/useLenis'
import SplitReveal from '../components/effects/SplitReveal'
import FadeUp from '../components/effects/FadeUp'
import MaskImage from '../components/effects/MaskImage'
import MagneticButton from '../components/effects/MagneticButton'
import { quickWhatsAppUrl } from '../lib/whatsapp'

export default function Oportunidad() {
  useSeo(copy.oportunidad.seo)
  const c = copy.oportunidad

  return (
    <div className="min-h-[100dvh]">
      {/* Hero con video real */}
      <section className="bg-aurora relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <p className="eyebrow">{c.hero.eyebrow}</p>
            <SplitReveal as="h1" className="headline mt-6 text-5xl md:text-7xl">
              {c.hero.headline}
            </SplitReveal>
            <FadeUp>
              <p className="mt-6 max-w-lg text-lg text-text-muted">{c.hero.sub}</p>
            </FadeUp>
            <FadeUp className="mt-10">
              <MagneticButton
                as="a"
                href={quickWhatsAppUrl('Hola Miriam, quiero conocer la oportunidad de negocio y unirme a tu equipo.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-brand px-7 py-4 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent glow-brand"
              >
                {c.cta}
              </MagneticButton>
            </FadeUp>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <video
              className="aspect-[4/5] w-full object-cover"
              src="/videos/landing-2.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label="La comunidad y el estilo de vida del equipo de Miriam"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Plan: dos bonos */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <SplitReveal as="h2" className="headline max-w-3xl text-4xl md:text-6xl">
            {c.plan.headline}
          </SplitReveal>

          <FadeUp className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.12}>
            {c.plan.bonos.map((b, i) => (
              <div
                key={b.titulo}
                className="relative overflow-hidden rounded-2xl border hairline bg-bg-alt p-8 md:p-10"
              >
                <span className="font-mono text-6xl font-bold text-brand/25 md:text-7xl">
                  0{i + 1}
                </span>
                <h3 className="font-display mt-4 text-2xl font-bold md:text-3xl">{b.titulo}</h3>
                <p className="mt-3 max-w-md text-text-muted">{b.texto}</p>
                <p className="mt-6 font-mono text-lg text-brand-accent">{b.dato}</p>
              </div>
            ))}
          </FadeUp>

          <p className="mt-8 max-w-2xl text-xs text-text-faint">{c.plan.nota}</p>
        </div>
      </section>

      {/* Camino en 3 pasos */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
            <MaskImage
              src="/images/miriam-despedida.jpg"
              alt="Miriam Zuniga, mentora de tu evolución"
              className="aspect-[4/5] rounded-2xl md:sticky md:top-28"
            />

            <div>
              <SplitReveal as="h2" className="headline text-4xl md:text-5xl">
                {c.pasos.headline}
              </SplitReveal>

              <div className="mt-12">
                {c.pasos.items.map((paso, i) => (
                  <FadeUp
                    key={paso.titulo}
                    className="border-t hairline py-8 md:py-10"
                    delay={i * 0.05}
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono text-3xl font-bold text-brand md:text-4xl">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-bold">{paso.titulo}</h3>
                        <p className="mt-2 max-w-md text-text-muted">{paso.texto}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
                <div className="border-t hairline" />
              </div>

              <FadeUp className="mt-12">
                <MagneticButton
                  as="a"
                  href={quickWhatsAppUrl('Hola Miriam, quiero conocer la oportunidad de negocio y unirme a tu equipo.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-brand px-7 py-4 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent glow-brand"
                >
                  {c.cta}
                </MagneticButton>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

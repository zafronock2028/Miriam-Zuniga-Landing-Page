import { copy } from '../data/copy'
import { useSeo } from '../lib/seo'
import SplitReveal from '../components/effects/SplitReveal'
import FadeUp from '../components/effects/FadeUp'
import MagneticButton from '../components/effects/MagneticButton'
import { quickWhatsAppUrl } from '../lib/whatsapp'

export default function Contacto() {
  useSeo(copy.contacto.seo)
  const c = copy.contacto

  return (
    <div className="bg-aurora relative flex min-h-[100dvh] items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pt-24 pb-16 md:grid-cols-2 md:px-8">
        <div>
          <p className="eyebrow">{c.hero.eyebrow}</p>
          <SplitReveal as="h1" className="headline mt-6 text-5xl md:text-7xl">
            {c.hero.headline}
          </SplitReveal>
          <FadeUp>
            <p className="mt-6 max-w-md text-lg text-text-muted">{c.hero.sub}</p>
          </FadeUp>

          <FadeUp className="mt-10 flex flex-wrap gap-4">
            <MagneticButton
              as="a"
              href={quickWhatsAppUrl('Hola Miriam, vengo de tu web y quiero hablar contigo.')}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand px-8 py-4 text-lg font-semibold text-text transition-colors duration-200 hover:bg-brand-accent glow-brand"
            >
              Hablar con Miriam
            </MagneticButton>
          </FadeUp>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 translate-y-6 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(225,27,34,0.35), rgba(123,47,168,0.12) 60%, transparent 75%)',
            }}
          />
          <img
            src="/images/miriam-despedida.jpg"
            alt="Miriam Zuniga esperando tu mensaje"
            className="w-full rounded-2xl object-cover"
            loading="lazy"
            width="800"
            height="1000"
          />
        </div>
      </div>
    </div>
  )
}

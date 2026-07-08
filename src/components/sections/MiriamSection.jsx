import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import SplitReveal from '../effects/SplitReveal'
import FadeUp from '../effects/FadeUp'
import { copy } from '../../data/copy'

gsap.registerPlugin(useGSAP)

/* Quién es Miriam: scroll storytelling con video real + tagline gráfica. */
export default function MiriamSection() {
  const c = copy.home.miriam
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Parallax suave del video
      gsap.to('.miriam-video', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Tagline: palabras entran escalonadas con scrub
      gsap.fromTo(
        '.tagline-word',
        { yPercent: 60, opacity: 0.1 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.tagline-block',
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )
    },
    { scope: rootRef }
  )

  return (
    <section ref={rootRef} id="miriam" className="relative overflow-hidden py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          {/* Retrato profesional con rim-light rojo */}
          <div className="relative order-2 md:order-1">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 translate-y-8 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(225,27,34,0.35), rgba(123,47,168,0.14) 60%, transparent 75%)',
              }}
            />
            <div className="miriam-video overflow-hidden rounded-2xl">
              <img
                src="/images/miriam-bio.png"
                alt="Miriam Zuniga, empresaria y mentora en bienestar"
                className="aspect-[4/5] w-full scale-110 object-cover object-top drop-shadow-[0_0_45px_rgba(225,27,34,0.25)]"
                loading="lazy"
                width="1013"
                height="1520"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <SplitReveal as="h2" className="headline text-4xl md:text-6xl">
              {c.headline}
            </SplitReveal>
            <FadeUp className="mt-8 space-y-5" stagger={0.12}>
              {c.bloques.map((b, i) => (
                <p key={i} className="max-w-lg text-lg leading-relaxed text-text-muted">
                  {b}
                </p>
              ))}
            </FadeUp>
          </div>
        </div>

        {/* Tagline como pieza gráfica */}
        <div className="tagline-block mt-24 border-y hairline py-10 md:mt-36 md:py-14">
          <p className="headline flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-[8vw] md:text-6xl lg:text-7xl">
            {c.tagline.map((w, i) => (
              <span key={w} className="tagline-word inline-block will-change-transform">
                <span className={i % 2 === 1 ? 'text-brand' : 'text-text'}>{w}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, prefersReducedMotion, STAGGER } from '../../lib/motion'

gsap.registerPlugin(useGSAP)

/**
 * Reveal palabra a palabra al entrar en viewport.
 * Split manual (sin plugin de pago). Reduce-motion: visible estático.
 */
export default function SplitReveal({
  as: Tag = 'p',
  children,
  className = '',
  delay = 0,
  y = 30,
}) {
  const ref = useRef(null)
  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const targets = ref.current?.querySelectorAll('.split-word')
      if (!targets?.length) return

      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          stagger: STAGGER.word,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <span className="split-word inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}

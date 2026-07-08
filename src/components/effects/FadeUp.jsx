import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

gsap.registerPlugin(useGSAP)

/** Reveal genérico al scroll: fade + subida con curva editorial. */
export default function FadeUp({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  y = 40,
  stagger = 0,
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = ref.current
      if (!el) return
      const targets = stagger > 0 ? Array.from(el.children) : el

      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
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
      {children}
    </Tag>
  )
}

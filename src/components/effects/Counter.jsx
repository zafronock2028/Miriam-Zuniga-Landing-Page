import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

gsap.registerPlugin(useGSAP)

/** Número gigante que cuenta al entrar en viewport (scrub suave). */
export default function Counter({ value, className = '', suffix = '' }) {
  const ref = useRef(null)
  const target = parseFloat(value)

  useGSAP(
    () => {
      if (prefersReducedMotion() || Number.isNaN(target)) return
      const el = ref.current
      if (!el) return

      const obj = { n: 0 }
      gsap.to(obj, {
        n: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.n) + suffix
        },
      })
    },
    { scope: ref }
  )

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

gsap.registerPlugin(useGSAP)

/**
 * CTA magnético: se desplaza suavemente hacia el cursor.
 * Auto-off en touch y reduce-motion. `as` permite <a> o <button>.
 */
export default function MagneticButton({ as: Tag = 'button', children, className = '', ...props }) {
  const ref = useRef(null)

  useGSAP(
    (context, contextSafe) => {
      if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
      const el = ref.current
      if (!el) return

      const strength = 0.35

      const onMove = contextSafe((e) => {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) * strength
        const y = (e.clientY - rect.top - rect.height / 2) * strength
        gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' })
      })

      const onLeave = contextSafe(() => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      })

      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)

      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={`inline-block will-change-transform ${className}`} {...props}>
      {children}
    </Tag>
  )
}

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

gsap.registerPlugin(useGSAP)

/** Imagen con reveal de máscara (clip-path) al entrar en viewport. */
export default function MaskImage({ src, alt, className = '', imgClassName = '', ...props }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = ref.current
      if (!el) return
      const img = el.querySelector('img')

      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        img,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} {...props} />
    </div>
  )
}

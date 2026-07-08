import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './motion'

/**
 * Cursor personalizado punto + ring con lerp.
 * Solo pointer fine + no reduce-motion. Devuelve refs para el componente.
 */
export function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return

    document.documentElement.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { x: pos.x, y: pos.y }
    const LERP = 0.15

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      gsap.set(dot, { x: pos.x, y: pos.y })
    }

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * LERP
      ringPos.y += (pos.y - ringPos.y) * LERP
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select')
      gsap.to(ring, { scale: interactive ? 1.8 : 1, duration: 0.25, ease: 'power2.out' })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      gsap.ticker.remove(tick)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return { dotRef, ringRef }
}

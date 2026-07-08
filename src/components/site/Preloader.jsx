import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

/** Luxury loader: negro, monograma MZ, línea de progreso roja. Máx 1.5 s. */
export default function Preloader({ onDone }) {
  const [gone, setGone] = useState(false)
  const rootRef = useRef(null)
  const barRef = useRef(null)
  const markRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setGone(true)
      onDone?.()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true)
        onDone?.()
      },
    })

    tl.fromTo(
      markRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
    )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.75, ease: 'power2.inOut' },
        '-=0.2'
      )
      .to(rootRef.current, { opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.05')

    return () => tl.kill()
  }, [onDone])

  if (gone) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-bg"
      aria-hidden="true"
    >
      <span
        ref={markRef}
        className="headline text-5xl text-text"
      >
        M<span className="text-brand">Z</span>
      </span>
      <div className="mt-8 h-px w-40 overflow-hidden bg-line">
        <div ref={barRef} className="h-full w-full origin-left bg-brand" />
      </div>
    </div>
  )
}

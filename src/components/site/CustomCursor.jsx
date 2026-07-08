import { useCursor } from '../../lib/useCursor'

/** Punto + ring con lerp. Se auto-desactiva en touch y reduce-motion. */
export default function CustomCursor() {
  const { dotRef, ringRef } = useCursor()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={dotRef}
        className="absolute -top-[3px] -left-[3px] h-1.5 w-1.5 rounded-full bg-brand-accent"
      />
      <div
        ref={ringRef}
        className="absolute -top-4 -left-4 h-8 w-8 rounded-full border border-brand/60"
      />
    </div>
  )
}

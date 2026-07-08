import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Motion OS — tokens compartidos por toda la web */
export const EASE = 'power3.out'
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1]
export const EASE_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)'

export const DUR = {
  reveal: 1.0,
  hover: 0.25,
  page: 0.8,
}

export const STAGGER = {
  word: 0.07,
  item: 0.09,
}

/** true si el usuario prefiere movimiento reducido */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** true en viewports táctiles/pequeños donde el 3D pesado se degrada */
export function isLowPowerViewport() {
  return (
    window.matchMedia('(max-width: 767px)').matches ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
  )
}

/**
 * matchMedia central de GSAP: registra animaciones que se
 * desactivan solas con prefers-reduced-motion.
 * Uso: motionMedia().add('(prefers-reduced-motion: no-preference)', ctx => {...})
 */
export function motionMedia() {
  return gsap.matchMedia()
}

export { gsap, ScrollTrigger }

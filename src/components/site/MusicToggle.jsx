import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/motion'

/* Música de fondo. Los navegadores bloquean autoplay con sonido, así que
   arranca en la primera interacción del usuario (scroll, click o tecla),
   con fade-in suave. Botón flotante para silenciar; preferencia persiste. */

const STORAGE_KEY = 'mz-musica'
const VOLUMEN = 0.32

export default function MusicToggle() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio('/musica-fondo.mp3')
    audio.loop = true
    audio.volume = 0
    audio.preload = 'none'
    audioRef.current = audio

    // Si el usuario la apagó antes, respetar
    if (localStorage.getItem(STORAGE_KEY) === 'off') return

    const arrancar = (e) => {
      // Si la primera interacción es el propio botón, lo maneja onClick
      if (e?.target?.closest?.('[data-music-toggle]')) return
      audio
        .play()
        .then(() => {
          setPlaying(true)
          gsap.to(audio, { volume: VOLUMEN, duration: 2.5, ease: 'power1.out' })
        })
        .catch(() => {}) // bloqueado: quedará en manos del botón
      quitar()
    }
    const quitar = () => {
      window.removeEventListener('pointerdown', arrancar)
      window.removeEventListener('keydown', arrancar)
      window.removeEventListener('scroll', arrancar)
    }

    window.addEventListener('pointerdown', arrancar)
    window.addEventListener('keydown', arrancar)
    window.addEventListener('scroll', arrancar, { passive: true })

    return () => {
      quitar()
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      gsap.to(audio, {
        volume: 0,
        duration: 0.6,
        ease: 'power1.in',
        onComplete: () => audio.pause(),
      })
      setPlaying(false)
      localStorage.setItem(STORAGE_KEY, 'off')
    } else {
      audio.play().then(() => {
        gsap.to(audio, { volume: VOLUMEN, duration: 1.2, ease: 'power1.out' })
        setPlaying(true)
        localStorage.setItem(STORAGE_KEY, 'on')
      }).catch(() => {})
    }
  }

  return (
    <button
      type="button"
      data-music-toggle
      onClick={toggle}
      aria-label={playing ? 'Silenciar música de fondo' : 'Activar música de fondo'}
      aria-pressed={playing}
      className="fixed right-5 bottom-5 z-[65] grid h-12 w-12 place-items-center rounded-full border border-line bg-bg/80 backdrop-blur-md transition-colors duration-200 hover:border-brand md:right-8 md:bottom-8"
    >
      <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full ${playing ? 'bg-brand-accent eq-bar' : 'bg-text-muted'}`}
            style={
              playing
                ? { animationDelay: `${i * 0.18}s` }
                : { height: `${4 + (i % 2) * 3}px` }
            }
          />
        ))}
      </span>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .eq-bar { animation: eq 0.9s ease-in-out infinite alternate; }
        }
        .eq-bar { height: 6px; }
        @keyframes eq {
          from { height: 4px; }
          to { height: 16px; }
        }
      `}</style>
    </button>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import MagneticButton from '../effects/MagneticButton'
import { quickWhatsAppUrl } from '../../lib/whatsapp'

const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/oportunidad', label: 'Oportunidad' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), {
      threshold: 0,
    })
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:0;height:60px;width:1px;'
    document.body.prepend(sentinel)
    obs.observe(sentinel)
    return () => {
      obs.disconnect()
      sentinel.remove()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/85 backdrop-blur-md border-b hairline' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-8">
        <Link to="/" aria-label="Miriam Zuniga, inicio" className="flex items-center gap-3">
          <img
            src="/images/logo-mz-blanco.png"
            alt="Miriam Zuniga"
            className="h-8 w-auto md:h-9"
            width="160"
            height="36"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${
                  isActive ? 'text-text' : 'text-text-muted hover:text-text'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <MagneticButton
            as="a"
            href={quickWhatsAppUrl('Hola Miriam, vengo de tu web y quiero más información.')}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-text transition-colors duration-200 hover:bg-brand-accent"
          >
            Hablar con Miriam
          </MagneticButton>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="grid h-11 w-11 place-items-center text-text md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-bg md:hidden">
          <nav aria-label="Menú móvil" className="flex flex-col gap-2 px-5 pt-8">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `headline py-3 text-4xl ${isActive ? 'text-brand' : 'text-text'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={quickWhatsAppUrl('Hola Miriam, vengo de tu web y quiero más información.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-full bg-brand px-6 py-4 text-center font-semibold text-text"
            >
              Hablar con Miriam
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

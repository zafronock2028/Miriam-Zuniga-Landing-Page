import { Link } from 'react-router-dom'
import { copy } from '../../data/copy'
import { quickWhatsAppUrl } from '../../lib/whatsapp'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t hairline bg-bg-alt">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        {/* Frase gigante */}
        <p className="headline max-w-4xl text-4xl text-text md:text-6xl">
          {copy.footer.frase}
        </p>

        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <div>
            <img
              src="/images/logo-mz-blanco.png"
              alt="Miriam Zuniga. Libertad, liderazgo, visión, impacto."
              className="h-12 w-auto"
              width="220"
              height="48"
              loading="lazy"
            />
            <a
              href={quickWhatsAppUrl('Hola Miriam, vengo de tu web y quiero más información.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:bg-brand-accent"
            >
              Hablar con Miriam
            </a>
          </div>

          <nav aria-label="Pie de página" className="flex flex-wrap gap-x-8 gap-y-3">
            {copy.footer.nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-text-muted transition-colors duration-200 hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t hairline pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-text-faint">
            {copy.footer.disclaimer}
          </p>
          <p className="mt-4 text-xs text-text-faint">
            © {year} Miriam Zuniga. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

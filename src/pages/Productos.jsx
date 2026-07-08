import { useState } from 'react'
import { copy } from '../data/copy'
import { useSeo } from '../lib/seo'
import { catalogProducts } from '../data/products'
import { quickWhatsAppUrl } from '../lib/whatsapp'
import SplitReveal from '../components/effects/SplitReveal'
import FadeUp from '../components/effects/FadeUp'

/* Catálogo completo: archive list con peek de imagen al hover. */

function FilaProducto({ p, abierta, onToggle }) {
  return (
    <div className="border-t hairline">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={abierta}
        className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[80px_1fr_auto_auto] md:gap-8"
      >
        <span className="hidden font-mono text-sm text-text-faint md:block">
          {p.categoria}
        </span>
        <span className="font-display text-2xl font-bold transition-colors duration-200 group-hover:text-brand-accent md:text-4xl">
          {p.nombre}
        </span>
        <span className="hidden max-w-[240px] text-sm text-text-muted lg:block">{p.para}</span>
        <span
          aria-hidden="true"
          className={`font-mono text-2xl text-text-muted transition-transform duration-300 ${
            abierta ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>

      {abierta && (
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-[300px_1fr]">
          <div className="relative mx-auto w-full max-w-[280px]">
            {p.imagen ? (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-6 rounded-full opacity-50 blur-2xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(20,128,143,0.3), transparent 70%)',
                  }}
                />
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="relative w-full object-contain"
                  loading="lazy"
                  width="480"
                  height="480"
                />
              </>
            ) : (
              /* 🔁 REEMPLAZAR imagen producto */
              <div className="grid aspect-square w-full place-items-center rounded-2xl border hairline bg-bg-alt">
                <span className="px-6 text-center font-mono text-xs text-text-faint">
                  Imagen en camino
                </span>
              </div>
            )}
          </div>

          <div>
            <p className="max-w-xl text-lg leading-relaxed text-text-muted">{p.resumen}</p>

            <ul className="mt-6 space-y-2">
              {p.beneficios.map((b) => (
                <li key={b} className="flex items-baseline gap-3 text-text-muted">
                  <span aria-hidden="true" className="h-px w-5 shrink-0 translate-y-[-3px] bg-higo-teal" />
                  {b}
                </li>
              ))}
            </ul>

            {p.ingredientes.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {p.ingredientes.map((ing) => (
                  <div key={ing.nombre} className="rounded-xl border hairline bg-bg-alt p-4">
                    <p className="font-mono text-sm font-bold" style={{ color: 'var(--color-higo-teal)' }}>
                      {ing.nombre}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">{ing.rol}</p>
                  </div>
                ))}
              </div>
            )}

            <a
              href={quickWhatsAppUrl(`Hola Miriam, me interesa ${p.nombre}. ¿Me cuentas más?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center rounded-full bg-brand px-6 py-3 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Productos() {
  useSeo(copy.productos.seo)
  const [abierta, setAbierta] = useState(catalogProducts[0].id)

  return (
    <div className="min-h-[100dvh] pt-28 md:pt-36">
      <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-8">
        <p className="eyebrow">{copy.productos.hero.eyebrow}</p>
        <SplitReveal as="h1" className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          {copy.productos.hero.headline}
        </SplitReveal>
        <FadeUp>
          <p className="mt-6 max-w-xl text-lg text-text-muted">{copy.productos.hero.sub}</p>
        </FadeUp>

        <FadeUp className="mt-16">
          {catalogProducts.map((p) => (
            <FilaProducto
              key={p.id}
              p={p}
              abierta={abierta === p.id}
              onToggle={() => setAbierta(abierta === p.id ? null : p.id)}
            />
          ))}
          <div className="border-t hairline" />
        </FadeUp>

        <p className="mt-10 max-w-2xl text-xs text-text-faint">{copy.productos.disclaimer}</p>
      </div>
    </div>
  )
}

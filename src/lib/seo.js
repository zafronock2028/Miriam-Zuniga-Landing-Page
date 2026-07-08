import { useEffect } from 'react'

const SITE = 'Miriam Zuniga'
const BASE_DESC =
  'Miriam Zuniga: liderazgo y vitalidad con productos de longevidad Higo Global. Evoluciona como cliente o construye tu negocio en su equipo.'

/** SEO por ruta: title único 50–60, meta 150–160, OG básico */
export function useSeo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} · Vitalidad y Liderazgo con Higo Global`

    setMeta('description', description || BASE_DESC)
    setMeta('og:title', document.title, 'property')
    setMeta('og:description', description || BASE_DESC, 'property')
    setMeta('og:type', 'website', 'property')
  }, [title, description])
}

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** JSON-LD Person (Miriam) + Organization (Higo) — inyectar una vez en Home */
export function injectJsonLd() {
  if (document.getElementById('jsonld-person')) return

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Miriam Zuniga',
    description:
      'Líder y mentora en bienestar y longevidad. Distribuidora independiente de Higo Global.',
    knowsAbout: ['longevidad', 'bienestar', 'liderazgo', 'emprendimiento'],
  }

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Higo Global',
    description: 'Productos de longevidad y bienestar celular.',
    url: 'https://higoglobal.com/',
  }

  for (const [id, data] of [
    ['jsonld-person', person],
    ['jsonld-org', org],
  ]) {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.id = id
    s.textContent = JSON.stringify(data)
    document.head.appendChild(s)
  }
}

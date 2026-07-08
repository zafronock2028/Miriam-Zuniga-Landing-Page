# Miriam Zuniga × Higo Global — Landing Page

Landing personal inmersiva y de alta conversión para la marca personal de **Miriam Zuniga**, promotora de los productos de longevidad y bienestar de **Higo Global**. Todo el sitio converge en un único objetivo: iniciar conversaciones por **WhatsApp** con dos intenciones etiquetadas (cliente / socio).

## Stack

- React 18 + Vite 8 + Tailwind CSS v4
- GSAP + ScrollTrigger + Lenis (motion)
- Three.js + React Three Fiber (partículas hero, post-LCP con degradación)
- React Hook Form + Zod (formulario), Sonner (toasts)
- Fuentes self-host vía Fontsource: Archivo (display), Manrope (body), JetBrains Mono (metadata), Fraunces (testimonios)

## Comandos

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # build de producción en /dist
npm run preview   # sirve el build
```

## Configuración obligatoria

Crea `.env.local` a partir de `.env.example`:

```
VITE_MIRIAM_WHATSAPP_NUMBER=521XXXXXXXXXX
```

Formato internacional sin `+` ni espacios (ej. México: `521` + 10 dígitos). Sin este número los botones de WhatsApp abren un chat vacío.

## Pendientes marcados con 🔁 REEMPLAZAR

| Dónde | Qué falta |
|---|---|
| `src/data/products.js` | Imágenes de HiGO NMN+, SOD, Probiotic y Collagen Peptide |
| `public/sitemap.xml` | Dominio real cuando esté definido |
| `.env.local` | Número de WhatsApp real de Miriam |

## Estructura

```
src/
  pages/        Home · Productos · Oportunidad · Contacto · Legal
  components/
    site/       Header · Footer · Preloader · PageTransition · CustomCursor
    sections/   Hero · Miriam · Higo · ProductReveal (pinned) · FeaturedProducts
                Beneficios · Oportunidad · Testimonios · Diagnóstico · LeadForm
    effects/    SplitReveal · FadeUp · MaskImage · Counter · MagneticButton
    three/      AuroraParticles (lazy, post-LCP)
  data/         products.js (fichas oficiales Higo) · copy.js (copy completo)
  lib/          motion.js · whatsapp.js · seo.js · useLenis.js · useCursor.js
public/         images/ · productos/ · testimonios/ · videos/
```

## Notas de diseño

- Paleta: negro cálido `#0A0A0C` + rojo Miriam `#E11B22` (único hue protagonista) + atmósfera aurora rojo→magenta→violeta solo en fondos. Teal/verde Higo exclusivo de módulos de producto.
- Todas las animaciones respetan `prefers-reduced-motion`; el 3D solo se monta en desktop capaz tras el LCP.
- Claims de salud redactados de forma responsable; disclaimer permanente en footer y página legal.

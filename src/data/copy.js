/* Copy COMPLETO del sitio — Voice DNA: primera persona de Miriam,
   autoridad cercana, frases cortas + largas. Palabras firma:
   evolución, liderazgo, vitalidad, impacto, libertad, comunidad, propósito. */

export const copy = {
  home: {
    hero: {
      eyebrow: 'MIRIAM ZUNIGA',
      headline: 'Tu vitalidad es tu poder',
      sub: 'Evoluciona con quien ya lo hizo. Longevidad real, liderazgo real.',
      ctaPrimario: 'Conocer los productos',
      ctaSecundario: 'Únete a mi equipo',
    },
    miriam: {
      headline: 'No vendo suplementos. Acompaño evoluciones.',
      bloques: [
        'Soy Miriam Zuniga. Lidero una comunidad que decidió dejar de esperar sentirse bien.',
        'Mi propósito es simple: que recuperes tu vitalidad y, si lo eliges, que construyas libertad a mi lado.',
        'El impacto no se promete. Se demuestra.',
      ],
      tagline: ['Libertad', 'Liderazgo', 'Visión', 'Impacto'],
    },
    higo: {
      eyebrow: 'RESPALDO CIENTÍFICO',
      headline: 'Higo Global. Longevidad en serio.',
      body: 'Fórmulas de bienestar celular con ingredientes estudiados: AKG, NAD+, espermidina, adaptógenos. Yo los uso. Mi comunidad los usa. Por eso los recomiendo.',
      datos: [
        { numero: '9', label: 'fórmulas de longevidad y bienestar' },
        { numero: '2', label: 'líneas específicas: mujer y hombre' },
        { numero: '1', label: 'propósito: tu vitalidad diaria' },
      ],
    },
    reveal: {
      pasos: [
        { fase: 'El ingrediente', texto: 'Calcio AKG + NR. Nutrientes que apoyan la producción de energía en cada célula.' },
        { fase: 'El beneficio', texto: 'Energía diaria, apoyo antioxidante y equilibrio para tu ritmo de vida.' },
        { fase: 'El resultado', texto: 'Vitalidad que se siente. Días con más presencia, más foco, más tú.' },
      ],
      cta: 'Pedir por WhatsApp',
    },
    beneficios: {
      headline: 'Lo que cambia cuando decides',
      items: [
        { n: '01', titulo: 'Vitalidad', texto: 'Energía celular real para tu día, no promesas vacías.' },
        { n: '02', titulo: 'Acompañamiento 1:1', texto: 'Te guío en persona. Tu evolución no camina sola.' },
        { n: '03', titulo: 'Productos respaldados', texto: 'Fórmulas con ingredientes estudiados por la ciencia de la longevidad.' },
        { n: '04', titulo: 'Resultados reales', texto: 'Historias de mi comunidad, con nombre y rostro.' },
      ],
    },
    oportunidad: {
      eyebrow: 'LA OPORTUNIDAD',
      headline: 'Construye libertad, no solo ingresos',
      body: 'Un negocio propio con mi mentoría directa, una comunidad que empuja y un plan de compensación simple: dos bonos, cero letra pequeña.',
      puntos: [
        { titulo: 'Libertad', texto: 'Tu tiempo vuelve a ser tuyo. Tú decides el ritmo.' },
        { titulo: 'Liderazgo', texto: 'Te formo para liderar tu propio equipo, paso a paso.' },
        { titulo: 'Comunidad', texto: 'Nadie evoluciona solo. Aquí se crece en equipo.' },
      ],
      cta: 'Quiero mi oportunidad',
    },
    testimonios: {
      headline: 'Mi comunidad habla',
      sub: 'Capturas reales de personas reales. Sin guiones.',
    },
    diagnostico: {
      headline: '¿Por dónde empieza tu evolución?',
      preguntas: [
        {
          id: 'objetivo',
          pregunta: '¿Qué buscas hoy?',
          opciones: ['Mejorar mi salud y vitalidad', 'Generar ingresos propios', 'Ambas'],
        },
        {
          id: 'etapa',
          pregunta: '¿En qué etapa estás?',
          opciones: ['25–35', '36–45', '46–55', '56+'],
        },
        {
          id: 'interes',
          pregunta: '¿Qué te interesa más?',
          opciones: ['Energía y longevidad', 'Equilibrio hormonal', 'Sistema inmune', 'El negocio'],
        },
      ],
    },
    form: {
      headline: 'Hablemos de tu evolución',
      sub: 'Déjame tus datos y te escribo por WhatsApp. Sin spam, sin presión.',
      campos: {
        nombre: 'Nombre y apellido',
        pais: 'País',
        whatsapp: 'Tu WhatsApp',
        intencion: '¿Qué te trae aquí?',
      },
      intenciones: [
        { value: 'cliente', label: 'Quiero probar los productos' },
        { value: 'socio', label: 'Quiero unirme al equipo' },
      ],
      submit: 'Comenzar mi evolución',
    },
    modal: {
      titulo: 'Tu asesoría con Miriam está lista.',
      texto: 'Te espero en WhatsApp para conocerte y acompañarte.',
      cta: 'Hablar con Miriam',
    },
  },

  productos: {
    seo: {
      title: 'Productos Higo Global de longevidad',
      description:
        'Catálogo Higo Global: GnAKG, GnCell, Aureva, ReGeneX y más. Fórmulas de longevidad y bienestar celular con acompañamiento de Miriam Zuniga.',
    },
    hero: {
      eyebrow: 'CATÁLOGO HIGO GLOBAL',
      headline: 'Ciencia de la longevidad, a tu ritmo',
      sub: 'Cada fórmula apoya tu vitalidad diaria. Yo te ayudo a elegir la tuya.',
    },
    disclaimer:
      'Estos productos no sustituyen tratamiento médico. Consulta a tu profesional de salud.',
  },

  oportunidad: {
    seo: {
      title: 'Únete al equipo de Miriam Zuniga',
      description:
        'Construye tu negocio de bienestar con mentoría directa de Miriam Zuniga y el plan de compensación simple de Higo Global: dos bonos, pago inmediato y semanal.',
    },
    hero: {
      eyebrow: 'LA OPORTUNIDAD',
      headline: 'Evoluciona a líder',
      sub: 'Negocio propio, mentoría 1:1 y una comunidad que no te suelta.',
    },
    plan: {
      headline: 'Dos formas de ganar. Así de simple.',
      bonos: [
        {
          titulo: 'Bono por referidos',
          texto: 'Ganas cuando alguien inicia con tu enlace. Pago inmediato.',
          dato: 'hasta US$153 por referido',
        },
        {
          titulo: 'Bono por equipo',
          texto: 'Ganas cuando tu equipo crece equilibrado. Pago semanal.',
          dato: 'US$76.50 por emparejamiento',
        },
      ],
      nota: 'Cifras del Plan de Compensación HiGO 2026. Los resultados dependen de tu trabajo y constancia.',
    },
    pasos: {
      headline: 'Tu camino conmigo',
      items: [
        { titulo: 'Escríbeme', texto: 'Me cuentas tu momento y tus metas. Yo te escucho.' },
        { titulo: 'Activa tu perfil', texto: 'Eliges tu paquete de inicio y montamos tu base.' },
        { titulo: 'Lidera', texto: 'Te formo en producto, comunidad y liderazgo real.' },
      ],
    },
    cta: 'Quiero mi oportunidad',
  },

  contacto: {
    seo: {
      title: 'Contacto directo con Miriam Zuniga',
      description:
        'Escríbele a Miriam Zuniga por WhatsApp: asesoría de productos Higo Global o información para unirte a su equipo. Respuesta personal, sin intermediarios.',
    },
    hero: {
      eyebrow: 'CONTACTO',
      headline: 'Estoy a un mensaje',
      sub: 'Sin bots ni intermediarios. Te respondo yo.',
    },
  },

  legal: {
    seo: {
      title: 'Aviso legal y privacidad',
      description:
        'Aviso legal, política de privacidad y descargo de responsabilidad del sitio de Miriam Zuniga, distribuidora independiente de Higo Global.',
    },
  },

  footer: {
    frase: 'Evoluciona con quien ya lo hizo.',
    disclaimer:
      'Estos productos no sustituyen tratamiento médico. Consulta a tu profesional de salud. Miriam Zuniga es distribuidora independiente de Higo Global. Los ingresos del plan de compensación dependen del esfuerzo individual y no están garantizados.',
    nav: [
      { to: '/', label: 'Inicio' },
      { to: '/productos', label: 'Productos' },
      { to: '/oportunidad', label: 'Oportunidad' },
      { to: '/contacto', label: 'Contacto' },
      { to: '/legal', label: 'Legal' },
    ],
  },
}

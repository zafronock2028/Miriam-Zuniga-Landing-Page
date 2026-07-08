/* Fuente oficial: fichas de producto Higo Global aportadas por Miriam.
   Claims redactados de forma responsable (apoya/favorece/contribuye).
   Estos productos no sustituyen tratamiento médico. */

export const products = [
  {
    id: 'gnakg-men',
    nombre: 'GnAKG Men™',
    categoria: 'Longevidad',
    para: 'Hombres con ritmo de vida exigente',
    imagen: '/productos/gnakg-men.png',
    resumen:
      'Fórmula multi-nutriente para el hombre moderno: energía celular, protección antioxidante y vitalidad diaria.',
    beneficios: [
      'Apoya la energía y vitalidad diaria',
      'Aporte nutricional antioxidante',
      'Apoya la salud hepática, nerviosa y metabólica',
    ],
    ingredientes: [
      { nombre: 'Calcio AKG + NR', rol: 'Producción de energía celular y vitalidad diaria' },
      { nombre: 'Pterostilbeno + Fisetina + Trehalosa', rol: 'Apoyo antioxidante frente al estrés oxidativo' },
      { nombre: 'Silibina + DHM', rol: 'Salud hepática y equilibrio de recuperación' },
      { nombre: 'Sistema de vitaminas B activas', rol: 'Conversión de energía y sistema nervioso' },
      { nombre: 'Glicinato de magnesio + Taurina', rol: 'Relajación muscular y función nerviosa' },
    ],
    destacado: true,
  },
  {
    id: 'gnakg-women',
    nombre: 'GnAKG Women™',
    categoria: 'Longevidad',
    para: 'Mujeres con estilo de vida activo',
    imagen: '/productos/gnakg-women.png',
    resumen:
      'Nutrientes clave para la mujer moderna: metabolismo energético, equilibrio y vitalidad diaria.',
    beneficios: [
      'Apoya la energía y vitalidad diaria',
      'Equilibrio nutricional femenino',
      'Ayuda a mantener cabello, piel y uñas saludables',
    ],
    ingredientes: [
      { nombre: 'Calcio AKG + NR', rol: 'Producción de energía celular y bienestar general' },
      { nombre: 'Folato activo + Metil B12', rol: 'Metabolismo energético y sistema nervioso' },
      { nombre: 'Red antioxidante', rol: 'Pterostilbeno, fisetina y trehalosa frente al estrés oxidativo' },
      { nombre: 'Biotina + B5 + B6', rol: 'Nutrición de cabello, piel y uñas' },
    ],
    destacado: true,
  },
  {
    id: 'aureva-women',
    nombre: 'Higo Aureva Women™',
    categoria: 'Equilibrio femenino',
    para: 'Mujeres que buscan equilibrio hormonal y emocional',
    imagen: '/productos/aureva-women.png',
    resumen:
      'Extractos botánicos, aminoácidos y antioxidantes para el equilibrio hormonal, la energía y el bienestar emocional.',
    beneficios: [
      'Ayuda a mantener el equilibrio hormonal y menstrual',
      'Apoya el bienestar emocional y el manejo del estrés',
      'Aporte nutricional antioxidante',
    ],
    ingredientes: [
      { nombre: 'Complejo de inositol 40:1', rol: 'Equilibrio hormonal y bienestar menstrual' },
      { nombre: 'Adaptógenos y botánicos', rol: 'Ashwagandha, damiana, ginkgo, maca negra y azafrán' },
      { nombre: 'L-Citrulina + L-Tirosina', rol: 'Circulación saludable y bienestar cognitivo' },
      { nombre: 'Mezcla detox antioxidante', rol: 'DIM, resveratrol y astaxantina' },
    ],
    destacado: true,
  },
  {
    id: 'gncell',
    nombre: 'Higo GnCell™',
    categoria: 'Salud celular',
    para: 'Quienes buscan bienestar a largo plazo',
    imagen: '/productos/gncell.png',
    resumen:
      'Nutrientes vegetales, extractos de hongos y micronutrientes para el equilibrio inmune y la renovación celular.',
    beneficios: [
      'Apoya la salud del sistema inmunológico',
      'Apoya el bienestar celular y la renovación diaria',
      'Fórmula vegetal y de hongos para el bienestar diario',
    ],
    ingredientes: [
      { nombre: 'Complejo de hongos', rol: 'Maitake, reishi, cola de pavo y melena de león' },
      { nombre: 'Espermidina', rol: 'Renovación celular y equilibrio nutricional' },
      { nombre: 'Curcumina + Quercetina', rol: 'Apoyo antioxidante diario' },
      { nombre: 'Pterostilbeno + PQQ + Ergotioneína', rol: 'Metabolismo energético celular' },
    ],
    destacado: true,
  },
  {
    id: 'regenex-men',
    nombre: 'Higo ReGeneX Men™',
    categoria: 'Vitalidad masculina',
    para: 'Hombres que cuidan su vitalidad integral',
    imagen: '/productos/regenex-men.png',
    resumen:
      'Botánicos, aminoácidos y minerales para la vitalidad, la circulación y el equilibrio metabólico masculino.',
    beneficios: [
      'Apoya la vitalidad y el bienestar masculino diario',
      'Apoya circulación, metabolismo y salud nerviosa',
      'Ayuda a mantener la salud prostática',
    ],
    ingredientes: [
      { nombre: 'Botánicos masculinos', rol: 'Saw palmetto, semilla de calabaza, licopeno' },
      { nombre: 'Vitalidad y circulación', rol: 'Tongkat ali, maca negra, L-arginina, L-citrulina' },
      { nombre: 'Apoyo antioxidante', rol: 'Té verde, semilla de uva, CoQ10, PQQ' },
      { nombre: 'Vitaminas y minerales', rol: 'Zinc, magnesio, selenio, C, D3, E, B6, B12' },
    ],
    destacado: true,
  },
  {
    id: 'nmn',
    nombre: 'HiGO NMN+™',
    categoria: 'Longevidad',
    para: 'Quienes buscan envejecimiento saludable',
    imagen: null, // 🔁 REEMPLAZAR imagen producto
    resumen: 'Apoyo a los niveles saludables de NAD+ y a la producción de energía celular.',
    beneficios: [
      'Ayuda a mantener niveles saludables de NAD+',
      'Favorece la producción de energía celular',
      'Contribuye al envejecimiento saludable',
    ],
    ingredientes: [],
    destacado: false,
  },
  {
    id: 'sod',
    nombre: 'HiGO SOD™',
    categoria: 'Antioxidante',
    para: 'Protección frente al estrés oxidativo',
    imagen: null, // 🔁 REEMPLAZAR imagen producto
    resumen: 'Apoyo antioxidante para proteger las células del estrés oxidativo diario.',
    beneficios: [
      'Proporciona apoyo antioxidante',
      'Ayuda a proteger las células del estrés oxidativo',
      'Contribuye al sistema inmunológico',
    ],
    ingredientes: [],
    destacado: false,
  },
  {
    id: 'probiotic',
    nombre: 'HiGO Probiotic™',
    categoria: 'Salud digestiva',
    para: 'Equilibrio digestivo e inmune',
    imagen: null, // 🔁 REEMPLAZAR imagen producto
    resumen: 'Equilibrio de la microbiota intestinal, mejor digestión y absorción de nutrientes.',
    beneficios: [
      'Favorece el equilibrio de la microbiota intestinal',
      'Ayuda a mejorar la digestión',
      'Apoya la salud del sistema inmunológico',
    ],
    ingredientes: [],
    destacado: false,
  },
  {
    id: 'collagen',
    nombre: 'HiGO Collagen Peptide™',
    categoria: 'Belleza y articulaciones',
    para: 'Piel, cabello, uñas y articulaciones',
    imagen: null, // 🔁 REEMPLAZAR imagen producto
    resumen: 'Péptidos de colágeno para la piel, el cabello, las uñas y las articulaciones.',
    beneficios: [
      'Contribuye a la salud de la piel',
      'Favorece el fortalecimiento de cabello y uñas',
      'Apoya la salud de las articulaciones',
    ],
    ingredientes: [],
    destacado: false,
  },
]

export const heroProduct = products.find((p) => p.id === 'gnakg-women')
export const featuredProducts = products.filter((p) => p.destacado)
export const catalogProducts = products

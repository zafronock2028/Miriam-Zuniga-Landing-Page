/* Conversión → WhatsApp. Toda la página converge aquí. */

/* Número público de Miriam; el env lo puede sobreescribir por entorno */
const NUMBER = import.meta.env.VITE_MIRIAM_WHATSAPP_NUMBER || '14088495126'

/** Link oficial de registro al equipo (back office Higo) */
export const REGISTRO_URL = 'https://point.vipyct.com/login?w=jbBqncrfQL8RI'

/**
 * Construye la URL wa.me con mensaje dinámico.
 * @param {Object} lead
 * @param {string} lead.nombre
 * @param {string} [lead.pais]
 * @param {'cliente'|'socio'} [lead.intencion]
 * @param {string[]} [lead.productos] productos de interés
 * @param {Object} [lead.diagnostico] respuestas del diagnóstico corto
 */
export function buildWhatsAppUrl(lead = {}) {
  const partes = ['Hola Miriam, soy ' + (lead.nombre || 'un nuevo prospecto') + '.']

  if (lead.pais) partes.push('Te escribo desde ' + lead.pais + '.')

  if (lead.intencion === 'socio') {
    partes.push('Quiero conocer la oportunidad de negocio y unirme a tu equipo.')
  } else if (lead.intencion === 'cliente') {
    partes.push('Quiero probar los productos Higo Global.')
  }

  if (lead.productos?.length) {
    partes.push('Me interesan: ' + lead.productos.join(', ') + '.')
  }

  if (lead.diagnostico) {
    const d = Object.entries(lead.diagnostico)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
    if (d.length) partes.push('Mi diagnóstico: ' + d.join(' · ') + '.')
  }

  const texto = encodeURIComponent(partes.join(' '))
  return `https://wa.me/${NUMBER}?text=${texto}`
}

/** CTA directo sin formulario (cards de producto, botones sueltos) */
export function quickWhatsAppUrl(mensaje) {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(mensaje)}`
}

export function hasWhatsAppNumber() {
  return NUMBER.length > 5
}

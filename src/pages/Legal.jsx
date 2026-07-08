import { copy } from '../data/copy'
import { useSeo } from '../lib/seo'

export default function Legal() {
  useSeo(copy.legal.seo)

  return (
    <div className="min-h-[100dvh] pt-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <h1 className="headline mt-6 text-4xl md:text-6xl">Aviso legal</h1>

        <section className="mt-12 space-y-4 text-text-muted">
          <h2 className="font-display text-2xl font-bold text-text">Descargo de responsabilidad</h2>
          <p>
            Los productos Higo Global mencionados en este sitio son suplementos alimenticios. No
            están destinados a diagnosticar, tratar, curar ni prevenir ninguna enfermedad. Estos
            productos no sustituyen tratamiento médico. Consulta a tu profesional de salud antes de
            iniciar cualquier suplementación.
          </p>
          <p>
            Miriam Zuniga actúa como distribuidora independiente de Higo Global. Los ingresos
            derivados del plan de compensación dependen del esfuerzo individual de cada persona y no
            constituyen una promesa de ganancias.
          </p>
        </section>

        <section className="mt-12 space-y-4 pb-24 text-text-muted">
          <h2 className="font-display text-2xl font-bold text-text">Privacidad</h2>
          <p>
            Los datos que compartes en el formulario (nombre, país, número de WhatsApp e intención)
            se usan únicamente para iniciar una conversación contigo por WhatsApp. No se almacenan
            en servidores propios ni se comparten con terceros.
          </p>
        </section>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import SplitReveal from '../effects/SplitReveal'
import FadeUp from '../effects/FadeUp'
import MagneticButton from '../effects/MagneticButton'
import { copy } from '../../data/copy'
import { buildWhatsAppUrl } from '../../lib/whatsapp'

const schema = z.object({
  nombre: z
    .string()
    .min(3, 'Escribe tu nombre completo')
    .max(80, 'Máximo 80 caracteres'),
  pais: z.string().min(2, 'Cuéntame desde qué país escribes'),
  whatsapp: z
    .string()
    .min(7, 'Número demasiado corto')
    .regex(/^[+\d][\d\s-]{6,18}$/, 'Solo números, espacios o +'),
  intencion: z.enum(['cliente', 'socio'], {
    errorMap: () => ({ message: 'Elige una opción' }),
  }),
})

function campoClase(error) {
  return `w-full rounded-xl border bg-bg-alt px-4 py-3.5 text-text placeholder:text-text-faint transition-colors duration-200 focus:border-brand focus:outline-none ${
    error ? 'border-brand-accent' : 'border-line'
  }`
}

export default function LeadForm({ diagnostico }) {
  const c = copy.home.form
  const m = copy.home.modal
  const [waUrl, setWaUrl] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    const url = buildWhatsAppUrl({
      nombre: data.nombre,
      pais: data.pais,
      intencion: data.intencion,
      diagnostico,
    })
    setWaUrl(url)
    toast.success('Todo listo. Miriam te espera.')
  }

  return (
    <section id="formulario" className="bg-aurora relative py-24 md:py-36">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <SplitReveal as="h2" className="headline text-center text-4xl md:text-6xl">
          {c.headline}
        </SplitReveal>
        <p className="mt-4 text-center text-text-muted">{c.sub}</p>

        <FadeUp>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-12 space-y-6">
            <div>
              <label htmlFor="nombre" className="mb-2 block text-sm font-semibold">
                {c.campos.nombre}
              </label>
              <input
                id="nombre"
                type="text"
                autoComplete="name"
                className={campoClase(errors.nombre)}
                {...register('nombre')}
              />
              {errors.nombre && (
                <p role="alert" className="mt-2 text-sm text-brand-accent">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="pais" className="mb-2 block text-sm font-semibold">
                  {c.campos.pais}
                </label>
                <input
                  id="pais"
                  type="text"
                  autoComplete="country-name"
                  className={campoClase(errors.pais)}
                  {...register('pais')}
                />
                {errors.pais && (
                  <p role="alert" className="mt-2 text-sm text-brand-accent">
                    {errors.pais.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold">
                  {c.campos.whatsapp}
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+52 000 000 0000"
                  className={campoClase(errors.whatsapp)}
                  {...register('whatsapp')}
                />
                {errors.whatsapp && (
                  <p role="alert" className="mt-2 text-sm text-brand-accent">
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold">{c.campos.intencion}</legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {c.intenciones.map((op) => (
                  <label
                    key={op.value}
                    className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-line bg-bg-alt px-4 py-3.5 transition-colors duration-200 has-checked:border-brand has-checked:bg-brand/10"
                  >
                    <input
                      type="radio"
                      value={op.value}
                      className="accent-[#e11b22]"
                      {...register('intencion')}
                    />
                    <span className="text-sm">{op.label}</span>
                  </label>
                ))}
              </div>
              {errors.intencion && (
                <p role="alert" className="mt-2 text-sm text-brand-accent">
                  {errors.intencion.message}
                </p>
              )}
            </fieldset>

            <MagneticButton
              as="button"
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-brand px-7 py-4 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent glow-brand disabled:opacity-60"
            >
              {c.submit}
            </MagneticButton>
          </form>
        </FadeUp>
      </div>

      {/* Modal WhatsApp */}
      {waUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
          className="fixed inset-0 z-[85] flex items-center justify-center bg-bg/85 px-5 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border hairline bg-bg-alt p-8 text-center glow-brand">
            <p className="headline text-3xl" id="modal-titulo">
              {m.titulo}
            </p>
            <p className="mt-4 text-text-muted">{m.texto}</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWaUrl(null)}
              className="mt-8 inline-block w-full rounded-full bg-brand px-7 py-4 font-semibold text-text transition-colors duration-200 hover:bg-brand-accent"
            >
              {m.cta}
            </a>
            <button
              type="button"
              onClick={() => setWaUrl(null)}
              className="mt-4 min-h-11 text-sm text-text-muted transition-colors hover:text-text"
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

import { useEffect, useState } from 'react'
import { useSeo, injectJsonLd } from '../lib/seo'
import HeroSection from '../components/sections/HeroSection'
import MiriamSection from '../components/sections/MiriamSection'
import HigoSection from '../components/sections/HigoSection'
import ProductReveal from '../components/sections/ProductReveal'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import BeneficiosSection from '../components/sections/BeneficiosSection'
import OportunidadSection from '../components/sections/OportunidadSection'
import TestimoniosSection from '../components/sections/TestimoniosSection'
import DiagnosticoSection from '../components/sections/DiagnosticoSection'
import LeadForm from '../components/sections/LeadForm'

export default function Home() {
  useSeo({})
  useEffect(() => injectJsonLd(), [])

  const [diagnostico, setDiagnostico] = useState({})
  const onDiagnostico = (id, valor) =>
    setDiagnostico((prev) => ({ ...prev, [id]: valor }))

  return (
    <>
      <HeroSection />
      <MiriamSection />
      <HigoSection />
      <ProductReveal />
      <FeaturedProducts />
      <BeneficiosSection />
      <OportunidadSection />
      <TestimoniosSection />
      <DiagnosticoSection respuestas={diagnostico} onChange={onDiagnostico} />
      <LeadForm diagnostico={diagnostico} />
    </>
  )
}

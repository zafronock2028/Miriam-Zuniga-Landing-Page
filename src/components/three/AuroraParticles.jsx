import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Partículas aurora: rojo→magenta→violeta, deriva lenta.
   Se monta post-LCP y solo en desktop sin reduce-motion. */

const PALETTE = [
  new THREE.Color('#e11b22'),
  new THREE.Color('#ff3b41'),
  new THREE.Color('#c4157e'),
  new THREE.Color('#7b2fa8'),
]

function Field({ count = 900 }) {
  const ref = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!ref.current) return
    ref.current.rotation.y = t * 0.02
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.06
    // deriva hacia el puntero, muy sutil
    ref.current.position.x += (state.pointer.x * 0.4 - ref.current.position.x) * 0.02
    ref.current.position.y += (state.pointer.y * 0.25 - ref.current.position.y) * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function AuroraParticles() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: false, powerPreference: 'low-power' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Field />
    </Canvas>
  )
}

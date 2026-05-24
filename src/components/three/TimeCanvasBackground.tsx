import { Line, PointMaterial, Points } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { Group, Vector3 } from 'three'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useSceneQuality } from '../../hooks/useSceneQuality'
import { SceneQuality } from '../../store/useSiteStore'
import { createTemporalGlyphs } from '../../utils/temporalGlyphs'

function createContourLines(count: number) {
  return Array.from({ length: count }, (_, lineIndex) => {
    const points: Vector3[] = []
    const yBase = -2.8 + lineIndex * 0.9

    for (let step = 0; step <= 18; step += 1) {
      const x = -8 + step * 0.9
      const y = yBase + Math.sin(step * 0.56 + lineIndex * 0.85) * 0.32
      const z = -3 + lineIndex * 0.35 + Math.cos(step * 0.28) * 0.2
      points.push(new Vector3(x, y, z))
    }

    return points
  })
}

function createTrails(count: number) {
  return Array.from({ length: count }, (_, trailIndex) => {
    const points: Vector3[] = []

    for (let step = 0; step <= 16; step += 1) {
      const x = -7 + step * 0.92
      const y = Math.cos(step * 0.45 + trailIndex) * 0.42 + trailIndex * 0.42 - 1.2
      const z = -1.8 + Math.sin(step * 0.38 + trailIndex * 0.7) * 0.8
      points.push(new Vector3(x, y, z))
    }

    return points
  })
}

function MistField({
  count,
  size,
  color,
  opacity,
}: {
  count: number
  size: number
  color: string
  opacity: number
}) {
  const groupRef = useRef<Group>(null)
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      data[index * 3] = (Math.random() - 0.5) * 18
      data[index * 3 + 1] = (Math.random() - 0.5) * 11
      data[index * 3 + 2] = (Math.random() - 0.5) * 10
    }

    return data
  }, [count])

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y = clock.elapsedTime * 0.015
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.08
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.12) * 0.15
  })

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
          opacity={opacity}
        />
      </Points>
    </group>
  )
}

function TerrainContours({ sceneQuality }: { sceneQuality: SceneQuality }) {
  const groupRef = useRef<Group>(null)
  const lineCount = sceneQuality === 'high' ? 7 : sceneQuality === 'medium' ? 5 : 3
  const lines = useMemo(() => createContourLines(lineCount), [lineCount])

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.05) * 0.06
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.07) * 0.08
  })

  return (
    <group ref={groupRef} position={[0, -0.6, -1.8]}>
      {lines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index % 2 === 0 ? '#8f9691' : '#6d8a92'}
          transparent
          opacity={0.08 + index * 0.015}
          lineWidth={0.6}
        />
      ))}
    </group>
  )
}

function TemporalTrails({ sceneQuality }: { sceneQuality: SceneQuality }) {
  const groupRef = useRef<Group>(null)
  const trailCount = sceneQuality === 'high' ? 4 : sceneQuality === 'medium' ? 3 : 2
  const trails = useMemo(() => createTrails(trailCount), [trailCount])

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.06) * 0.09
    groupRef.current.position.x = Math.sin(clock.elapsedTime * 0.04) * 0.2
  })

  return (
    <group ref={groupRef} position={[0, 0.1, -0.8]}>
      {trails.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index % 2 === 0 ? '#b18b54' : '#ebe6da'}
          transparent
          opacity={0.1}
          lineWidth={0.9}
        />
      ))}
    </group>
  )
}

function SceneAtmosphere({
  sceneQuality,
  prefersReducedMotion,
}: {
  sceneQuality: SceneQuality
  prefersReducedMotion: boolean
}) {
  useFrame(({ camera, clock }) => {
    if (prefersReducedMotion) {
      return
    }

    camera.position.x = Math.sin(clock.elapsedTime * 0.05) * 0.18
    camera.position.y = Math.cos(clock.elapsedTime * 0.06) * 0.16
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <color attach="background" args={['#080b0d']} />
      <fog attach="fog" args={['#080b0d', 5, 16]} />
      <ambientLight intensity={0.8} color="#7f9198" />
      <directionalLight position={[4, 3, 5]} intensity={0.5} color="#b18b54" />
      <pointLight position={[-4, 1, 3]} intensity={0.4} color="#6d8a92" />
      <MistField
        count={sceneQuality === 'high' ? 180 : sceneQuality === 'medium' ? 110 : 72}
        size={sceneQuality === 'low' ? 0.085 : 0.075}
        color="#ebe6da"
        opacity={0.28}
      />
      <MistField
        count={sceneQuality === 'high' ? 120 : sceneQuality === 'medium' ? 80 : 44}
        size={0.05}
        color="#6d8a92"
        opacity={0.18}
      />
      <TerrainContours sceneQuality={sceneQuality} />
      <TemporalTrails sceneQuality={sceneQuality} />
    </>
  )
}

function GlyphField({ sceneQuality }: { sceneQuality: SceneQuality }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const glyphCount = sceneQuality === 'high' ? 16 : sceneQuality === 'medium' ? 12 : 8
  const glyphs = useMemo(() => createTemporalGlyphs(glyphCount), [glyphCount])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {glyphs.map((glyph) => (
        <motion.div
          key={glyph.id}
          className="absolute"
          style={{
            left: `${glyph.x}%`,
            top: `${glyph.y}%`,
            opacity: glyph.opacity,
            filter: `blur(${glyph.blur}px)`,
            transform: `translate(-50%, -50%) rotate(${glyph.rotate}deg) scale(${glyph.scale})`,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, glyph.drift, 0],
                  y: [0, -glyph.drift * 0.85, 0],
                  opacity: [glyph.opacity * 0.6, glyph.opacity, glyph.opacity * 0.6],
                }
          }
          transition={{
            duration: glyph.duration,
            delay: glyph.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <p className="font-display text-[clamp(1.3rem,2vw,2.3rem)] tracking-[0.3em] text-white/55">
            {glyph.primary}
          </p>
          <p className="mt-1 text-[10px] tracking-[0.42em] text-white/20">{glyph.secondary}</p>
        </motion.div>
      ))}
    </div>
  )
}

function TimeCanvasBackground() {
  const sceneQuality = useSceneQuality()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(109,138,146,0.12),transparent_0_36%),radial-gradient(circle_at_70%_20%,rgba(177,139,84,0.08),transparent_0_22%),linear-gradient(180deg,rgba(8,11,13,0.22),rgba(8,11,13,0.72)_70%,rgba(8,11,13,0.96))]" />
      <Canvas camera={{ position: [0, 0, 6.5], fov: 46 }} dpr={[1, sceneQuality === 'high' ? 1.6 : 1.25]}>
        <SceneAtmosphere sceneQuality={sceneQuality} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
      <GlyphField sceneQuality={sceneQuality} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(8,11,13,0),rgba(8,11,13,0.72)_78%),linear-gradient(90deg,rgba(8,11,13,0.4),transparent_28%,transparent_72%,rgba(8,11,13,0.4))]" />
    </div>
  )
}

export default TimeCanvasBackground

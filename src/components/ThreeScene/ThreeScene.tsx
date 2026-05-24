import { useFrame } from '@react-three/fiber'
import { PointMaterial, Points } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function Stars() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 180

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      data[index * 3] = (Math.random() - 0.5) * 18
      data[index * 3 + 1] = (Math.random() - 0.5) * 12
      data[index * 3 + 2] = (Math.random() - 0.5) * 10
    }

    return data
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) {
      return
    }

    pointsRef.current.rotation.y = clock.elapsedTime * 0.025
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.08
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8bd9ff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

function Connections() {
  const lineRef = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const segments = 44
    const positions = new Float32Array(segments * 6)

    for (let index = 0; index < segments; index += 1) {
      const baseX = (Math.random() - 0.5) * 12
      const baseY = (Math.random() - 0.5) * 7
      const baseZ = (Math.random() - 0.5) * 8

      positions[index * 6] = baseX
      positions[index * 6 + 1] = baseY
      positions[index * 6 + 2] = baseZ
      positions[index * 6 + 3] = baseX + (Math.random() - 0.5) * 2
      positions[index * 6 + 4] = baseY + (Math.random() - 0.5) * 2
      positions[index * 6 + 5] = baseZ + (Math.random() - 0.5) * 2
    }

    const bufferGeometry = new THREE.BufferGeometry()
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    return bufferGeometry
  }, [])

  useFrame(({ clock }) => {
    if (!lineRef.current) {
      return
    }

    lineRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.09) * 0.08
    lineRef.current.rotation.y = clock.elapsedTime * 0.018
  })

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#5dbef7" transparent opacity={0.12} />
    </lineSegments>
  )
}

function SceneContent() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useFrame(({ camera, clock }) => {
    if (prefersReducedMotion) {
      return
    }

    camera.position.x = Math.sin(clock.elapsedTime * 0.08) * 0.16
    camera.position.y = Math.cos(clock.elapsedTime * 0.06) * 0.12
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <color attach="background" args={['#030508']} />
      <fog attach="fog" args={['#030508', 6, 20]} />
      <ambientLight intensity={0.7} color="#4aa4d6" />
      <pointLight position={[2, 1, 4]} intensity={0.8} color="#83d4ff" />
      <Stars />
      <Connections />
    </>
  )
}

function ThreeScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 52 }} dpr={[1, 1.6]}>
        <SceneContent />
      </Canvas>
    </div>
  )
}

export default ThreeScene

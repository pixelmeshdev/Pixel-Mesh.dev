import { useFrame } from '@react-three/fiber'
import { Edges, RoundedBox } from '@react-three/drei'
import { useRef } from 'react'

export default function Model({ shape }) {
  const mesh = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (!mesh.current) return

    mesh.current.rotation.x = 0.45 + Math.sin(time * 0.7) * 0.14
    mesh.current.rotation.y = -0.55 + time * 0.35
    mesh.current.rotation.z = 0.18 + Math.sin(time * 0.5) * 0.08
    mesh.current.position.y = Math.sin(time * 1.4) * 0.38
  })

  return (
    <group ref={mesh}>
      {shape === 'torusKnot' ? (
        <mesh castShadow receiveShadow>
          <torusKnotGeometry args={[0.86, 0.26, 180, 24, 2, 3]} />
          <meshPhysicalMaterial
            color="#112c62"
            metalness={0.92}
            roughness={0.16}
            clearcoat={0.7}
            clearcoatRoughness={0.1}
          />
        </mesh>
      ) : (
        <RoundedBox
          args={[1.75, 1.75, 1.75]}
          radius={0.045}
          smoothness={5}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#112c62"
            metalness={0.92}
            roughness={0.16}
            clearcoat={0.7}
            clearcoatRoughness={0.1}
          />
          <Edges color="#f0c7c1" threshold={15} />
        </RoundedBox>
      )}
    </group>
  )
}

import { useFrame } from '@react-three/fiber'
import { Image, MeshReflectorMaterial, Text } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const projects = [
  { id: '01', title: 'Green Turban', category: 'Love Story', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', link: 'https://example.com/project-one' },
  { id: '02', title: 'Golden Feelings', category: 'Portraits', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', link: 'https://example.com/project-two' },
  { id: '03', title: 'Little Lady', category: 'Wedding', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', link: 'https://example.com/project-three' },
  { id: '04', title: 'Sweet Harmony', category: 'Portraits', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80', link: 'https://example.com/project-four' },
  { id: '05', title: 'Holiday Makeup', category: 'Fashion', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', link: 'https://example.com/project-five' },
  { id: '06', title: 'The Big Day', category: 'Love Story', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80', link: 'https://example.com/project-six' },
]

function CarouselCard({ index, progress, item }) {
  const card = useRef()

  useFrame(() => {
    const theta = index * ((2 * Math.PI) / projects.length) + progress.current
    const focus = Math.max(0, 1 - Math.abs(Math.atan2(Math.sin(theta), Math.cos(theta))) * 1.6)
    const scale = 1 + focus * 0.12

    card.current.position.set(Math.sin(theta) * 7.2, 0.4, Math.cos(theta) * 4.2 - 4.2)
    card.current.rotation.y = theta
    card.current.scale.setScalar(scale)
    card.current.traverse((child) => {
      if (child.material) {
        child.material.transparent = true
        child.material.opacity = 0.25 + focus * 0.75
      }
    })
  })

  return (
    <group
      ref={card}
      onClick={(event) => {
        event.stopPropagation()
        window.open(item.link, '_blank', 'noopener,noreferrer')
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'auto' }}
    >
      <Image url={item.url} scale={[8.2, 4]} transparent radius={0.04} />
      <Text position={[0, -1.7, 0.02]} fontSize={0.12} color="#aaa" anchorX="center" anchorY="top" letterSpacing={0.15}>
        {item.category.toUpperCase()}
      </Text>
      <Text position={[0, -2.02, 0.05]} fontSize={0.2} color="#fff" anchorX="center" anchorY="top">
        {item.title}
      </Text>
    </group>
  )
}

export default function ReflectiveFloor() {
  const progress = useRef(0)
  const targetProgress = useRef(0)
  const isDragging = useRef(false)
  const lastX = useRef(0)

  useFrame((_, delta) => {
    progress.current = THREE.MathUtils.damp(
      progress.current,
      targetProgress.current,
      6,
      delta,
    )
  })

  return (
    <group
      onWheel={(event) => { targetProgress.current -= event.deltaY * 0.0015 }}
      onPointerDown={(event) => {
        isDragging.current = true
        lastX.current = event.clientX
      }}
      onPointerMove={(event) => {
        if (!isDragging.current) return
        targetProgress.current += (event.clientX - lastX.current) * 0.004
        lastX.current = event.clientX
      }}
      onPointerUp={() => { isDragging.current = false }}
      onPointerLeave={() => { isDragging.current = false }}
    >
      {projects.map((item, index) => (
        <CarouselCard key={item.id} index={index} progress={progress} item={item} />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial blur={[200, 100]} resolution={512} mixBlur={0.8} mixStrength={1.5} roughness={0.4} depthScale={1.2} minDepthThreshold={0.2} maxDepthThreshold={1.5} color="#0d0d0d" metalness={0.6} />
      </mesh>
    </group>
  )
}

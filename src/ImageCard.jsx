import { useRef, useState } from 'react'
 import {useFrame } from '@react-three/fiber'
 import { useTexture } from '@react-three/drei'
 import * as THREE from 'three'

 export default function ImageCard({ url, position = [0, 1.6, 0] }){
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)

    const texture = useTexture(url)

    const imageAspect = texture.image.width / texture.image.height
    const planeWidth = 2.2
    const planeheight = planeWidth / imageAspect

    useFrame((state) =>{
        if(meshRef.current){
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
             meshRef.current.rotation.y,
             hovered ? state.pointer.x * 0.25 : 0,
             0.1
        )
        meshRef.current.rotation.x = THREE.MathUtils.lerp( 
            meshRef.current.rotation.x,
             hovered ? -state.pointer.y * 0.2 : 0,
              0.1
            )
    }
    })

    return(
        <mesh 
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow>
            <planeGeometry args={ [planeWidth, planeheight, 10, 10]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
    )
}



import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float noise(vec2 point) {
    return fract(sin(dot(point, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse * 0.5 + 0.5;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

    float drift = sin((uv.y + uTime * 0.035) * 13.0) * 0.018;
    uv.x += drift;

    float distanceToMouse = length((uv - mouse) * aspect);
    float cursorGlow = smoothstep(0.72, 0.0, distanceToMouse);
    float wave = sin((uv.x * 5.0 + uv.y * 3.0 + uTime * 0.22) * 2.0) * 0.5 + 0.5;
    float grain = noise(uv * uResolution.xy + uTime) * 0.07;

    vec3 cool = vec3(0.08, 0.30, 0.72);
    vec3 violet = vec3(0.33, 0.12, 0.58);
    vec3 glow = mix(cool, violet, wave) * (cursorGlow * 0.42 + 0.06);

    gl_FragColor = vec4(glow + grain, 0.42);
  }
`

export default function ShaderBackground() {
  const material = useRef()
  const mouse = useMemo(() => new THREE.Vector2(), [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: mouse },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [mouse],
  )

  useFrame(({ clock, pointer, size }) => {
    mouse.lerp(pointer, 0.06)
    material.current.uniforms.uTime.value = clock.getElapsedTime()
    material.current.uniforms.uResolution.value.set(size.width, size.height)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

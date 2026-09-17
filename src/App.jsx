import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import Model from './Model.jsx'
import Navbar from './Navbar.jsx'
import ShaderBackground from './ShaderBackground.jsx'
import './App.css'
import Main from './Hero.jsx'
import About from './About.jsx'
import ReflectiveFloor from './ReflectiveFloor.jsx'
import Service from './Service.jsx'
import Process from './Process.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'

const variations = [
  {
    role: 'designer',
    word: 'Design',
    shape: 'cube',
  },
  {
    role: 'developer',
    word: 'Development',
    shape: 'torusKnot',
  },
  {
    role: 'developer',
    word: 'Deploy',
    shape: 'cube',
  },
]

export default function App() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((value) => (value + 1) % variations.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const variation = variations[current]

  return (
    <main className="app">
      <div className="background" />
      <Canvas className="shader-background" orthographic camera={{ position: [0, 0, 1] }}>
        <ShaderBackground />
      </Canvas>

      <Navbar />

      <section id="home" className="hero">
        <Main variation={variation} />

        <div className="model-container">
          <Canvas
            shadows
            camera={{ position: [0, 0.5, 5], fov: 45 }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[3, 5, 4]} intensity={3} />
            <pointLight
              position={[-4, 2, -3]}
              intensity={5}
              color="#00d2ff"
            />

            <Suspense fallback={null}>
              <Environment preset="city" />
              <Model shape={variation.shape} />
            </Suspense>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              autoRotate={false}
              maxPolarAngle={Math.PI / 2}
            />

          </Canvas>
        </div>
      </section>

      <About />

      <Service />

      <section id="work" className="work">
        <div className="work-heading">
          <p className="section-label">Selected work</p>
          <h2>Ideas brought to life in three dimensions.</h2>
        </div>
        <div className="work-canvas">
          <Canvas shadows camera={{ position: [0, 0.4, 6], fov: 45 }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[4, 7, 4]} intensity={3} castShadow />
            <Suspense fallback={null}>
              <Environment preset="city" />
              <ReflectiveFloor />
            </Suspense>
            <OrbitControls
              target={[0, 0.2, 0]}
              enablePan={false}
              enableZoom={false}
              enableDamping
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>
      </section>

      <Process />
      <Contact />
      <Footer />
    </main>
  )
}

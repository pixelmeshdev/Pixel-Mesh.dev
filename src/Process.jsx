import { useState } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discover',
    summary: 'Understand the idea.',
    detail: 'We discuss your business, goals, audience, content, and what the website needs to achieve.',
  },
  {
    number: '02',
    title: 'Define',
    summary: 'Plan the experience.',
    detail: 'I organize the content, user flow, structure, and technical requirements before jumping into visuals.',
  },
  {
    number: '03',
    title: 'Design',
    summary: 'Shape the visual direction.',
    detail: 'I create the UI, layouts, visual system, interactions, and prototypes so the experience is clear before development.',
  },
  {
    number: '04',
    title: 'Build',
    summary: 'Bring the interface to life.',
    detail: 'I develop responsive layouts, animation, interaction, and—when appropriate—3D and WebGL.',
  },
  {
    number: '05',
    title: 'Deploy',
    summary: 'Polish, optimize, and launch.',
    detail: 'We review the result, fix issues, optimize performance, and deploy the finished website.',
  },
]

export default function Process() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="process" className="process-section">
      <div className="process-heading">
        <p className="section-label">Process</p>
        <h2>How we work</h2>
      </div>

      <div className="process-list">
        {steps.map((step, index) => {
          const isActive = index === activeStep

          return (
            <button
              key={step.number}
              className={`process-step${isActive ? ' is-active' : ''}`}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveStep(index)}
            >
              <span className="process-number">{step.number}</span>
              <span className="process-title">{step.title}</span>
              <span className="process-summary">{step.summary}</span>
              <span className="process-detail">{step.detail}</span>
              <span className="process-toggle" aria-hidden="true">{isActive ? '−' : '+'}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

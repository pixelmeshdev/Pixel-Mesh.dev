import { useState } from 'react'

const services = [
  {
    number: '01',
    title: 'Interactive Web Design',
    description: 'Designing distinctive websites around users, brands, and ideas.',
    detail: 'Strategy, visual systems, and interaction design for memorable digital products.',
  },
  {
    number: '02',
    title: 'Web Development',
    description: 'Turning designs into fast, responsive digital experiences.',
    detail: 'Accessible, maintainable frontends built to perform beautifully across devices.',
  },
  {
    number: '03',
    title: '3D & WebGL',
    description: 'Creating interactive 3D experiences for the web.',
    detail: 'Real-time scenes, shaders, and motion that make a site feel alive.',
  },
  {
    number: '04',
    title: 'Motion & Creative Development',
    description: 'Bringing interfaces to life through movement and interaction.',
    detail: 'Purposeful transitions and creative code that guide attention and tell a story.',
  },
]

export default function Service() {
  const [activeService, setActiveService] = useState(0)

  return (
    <section id="services" className="services-section">
      <div className="services-heading">
        <p className="section-label">Services</p>
        <h2>Creative technology for experiences that stand out.</h2>
      </div>

      <div className="service-grid">
        {services.map((service, index) => {
          const isActive = index === activeService

          return (
            <article
              key={service.number}
              className={`service-card${isActive ? ' is-active' : ''}`}
            >
              <button
                className="service-select"
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveService(index)}
              >
                <span className="service-number">{service.number}</span>
                <span className="service-title">{service.title}</span>
                <span className="service-description">{service.description}</span>
                <span className="service-detail">{service.detail}</span>
              </button>
              <a className="service-action" href="#contact">
                Explore service <span aria-hidden="true">→</span>
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

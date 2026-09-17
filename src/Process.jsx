import { useState } from 'react'

const services = [
    {
        number: '01',
        title: 'DISCOVER  ',
        description: 'Understand the idea.',
        detail: 'We discuss your business, goals, audience, content, and what the website needs to achieve.',
    },
    {
        number: '02',
        title: ' DEFINE',
        description: ' Plan the experience.',
    detail: 'I organize the content, user flow, structure, and technical requirements before jumping into visuals.',
    },
    {
        number: '03',
        title: ' DESIGN',
        description: 'Creating interactive 3D experiences for the web.',
        detail: 'I create the UI, layouts, visual system, interactions, and prototypes so the experience is clear before development.',
    },
    {
        number: '04',
        title: 'BUILD',
        description: 'Bringing interfaces to life through movement and interaction.',
        detail: 'I develop the website with responsive layouts, animation, interaction, and—when appropriate—3D/WebGL.',
    },
    {
    number: '05',
        title: ' DEPLOY',
        description: 'Polish it, optimize it, launch it.',
        detail: 'We review the result, fix issues, optimize performance, and deploy the finished website.',
    },
]

export default function Service() {
    const [activeService, setActiveService] = useState(0)

    return (
        <section id="services" className="services-section">
            <div className="services-heading">
                <p className="section-label">PROCESS</p>
                <h2>How we work</h2>
            </div>

            <div className="service-grid">
                {services.map((service, index) => {
                    const isActive = index === activeService

                    return (
                        <button
                            key={service.number}
                            className={`service-card${isActive ? ' is-active' : ''}`}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setActiveService(index)}
                        >
                            <span className="service-number">{service.number}</span>
                            <span className="service-title">{service.title}</span>
                            <span className="service-description">{service.description}</span>
                            <span className="service-detail">{service.detail}</span>
                            <a className="service-action" href="#contact">
                Explore service <span aria-hidden="true">→</span>
              </a>
                        </button>
                    )
                })}
            </div>
        </section>
    )
}

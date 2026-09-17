export default function Main({ variation }) {
  return (
    <div className="content">
      <p className="eyebrow">Pixel Mesh Dev</p>
      <p className="intro">
        Creative <span>{variation.role}</span>
      </p>

      <h1>
        DIGITAL
        <br />
        EXPERIENCES
        <br />
        THAT MOVE.
      </h1>

      <p className="services">
        <span>Design</span> × <span>Development</span> × <span>Deploy</span>
      </p>
    </div>
  )
}

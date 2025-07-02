import './hero-section.css'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">No Dog Left Behind</h1>
        <p className="hero-tagline">Bringing dogs from shelters to sofas.</p>
        <a href="#browse" className="hero-button">
          Browse Dogs
        </a>
      </div>
    </section>
  )
}

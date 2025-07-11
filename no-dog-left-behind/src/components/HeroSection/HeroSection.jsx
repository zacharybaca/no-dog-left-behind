import './hero-section.css'
import { useDogSearch } from '../../hooks/useDogSearch'

export default function HeroSection() {
  const { fetchDogs } = useDogSearch()

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">No Dog Left Behind</h1>
        <p className="hero-tagline">Bringing dogs from shelters to sofas.</p>
        <button type="button" className="hero-button" onClick={() => fetchDogs()}>
          Browse Dogs
        </button>
      </div>
    </section>
  )
}

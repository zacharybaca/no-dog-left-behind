import './hero-section.css'
import { useDogSearch } from '../../hooks/useDogSearch'

export default function HeroSection() {
  const { fetchDogs } = useDogSearch()

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Who Rescues Who?</h1>
        <h1 className="hero-title">Find Out Today.</h1>
        <button type="button" className="hero-button" onClick={() => fetchDogs()}>
          Browse Dogs
        </button>
      </div>
    </section>
  )
}

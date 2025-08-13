import './hero-section.css'
import { useAuth } from '../../hooks/useAuth'

export default function HeroSection({ fetchDogs, isLoading }) {
  const { isAuthenticated } = useAuth()

  return (
    !isLoading && (
      <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Who Rescues Who?</h1>
        <h1 className="hero-title">Find Out Today.</h1>
        {isAuthenticated && (
          <button type="button" className="hero-button" onClick={() => fetchDogs()}>
          Browse Dogs
        </button>
        )}
      </div>
    </section>
    )
  )
}

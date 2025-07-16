import './hero-section.css'

export default function HeroSection({ fetchDogs, isLoading }) {
  

  return (
    !isLoading && (
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
  )
}

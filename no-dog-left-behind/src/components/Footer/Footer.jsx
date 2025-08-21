import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer id="footer">
      <p className="footer-meta">
        Built with ❤️ by <a href="https://github.com/zacharybaca">Zachary Baca</a>. v1.0.0
      </p>

      <div className="footer-social">
        <a href="https://facebook.com">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://instagram.com">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://twitter.com">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>

      <div id="footer-logo-container">
        <a href="/" className="footer-logo">
          <img src="/assets/no-dog-left-behind-logo.png" alt="No Dog Left Behind Logo" />
        </a>
      </div>

      <div id="tagline-container">
        <p>&copy; {new Date().getFullYear()} Adopt. Don't shop.</p>
      </div>
    </footer>
  )
}

export default Footer

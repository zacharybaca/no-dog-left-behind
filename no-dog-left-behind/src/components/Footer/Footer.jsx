import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {

    return (
        <footer id="footer">
            <div id="tagline-container">
                <p>&copy; {new Date().getFullYear()} Adopt. Don't shop.</p>
            </div>
            
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

        </footer>
    )
}

export default Footer;

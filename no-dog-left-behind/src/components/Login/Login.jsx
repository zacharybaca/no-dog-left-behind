import './login.css';
import PawPrintImage from '../../assets/paw-print-image.jpg';

const Login = () => {

    return (
        <div className="login-container">
            <form className="login-form">
                <img src={PawPrintImage} alt="Paw Print Background" className="login-bg" />
                <h2>Welcome Back</h2>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login;

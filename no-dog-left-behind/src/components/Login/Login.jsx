import './login.css';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const { error, success, handleChange, handleSubmit } = useAuth();

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <img src="/assets/paw-print-image.jpg" alt="Paw Print" className="login-bg" />
                <h2>Welcome Back</h2>
                <label htmlFor="name">Please Enter Your Name: </label>
                <input type="text" id="name" name="name" onChange={handleChange} placeholder="Name" required />
                <label htmlFor="email">Please Enter Your E-mail Address: </label>
                <input type="email" id="email" name="email" onChange={handleChange} placeholder="E-mail" required />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login;

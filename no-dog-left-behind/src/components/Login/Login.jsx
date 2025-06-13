import './login.css';

const Login = () => {

    return (
        <div className="login-container">
            <form className="login-form">
                <img src="/assets/paw-print-image.jpg" alt="Paw Print" className="login-bg" />
                <h2>Welcome Back</h2>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login;

import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"; // Importing CSS for styling

const Login = () => {
    const [loginType, setLoginType] = useState("student");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Add logic to handle login submission
        console.log(`Login as: ${loginType}, Username: ${username}`);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Academix</h1>
                <h2>Welcome Back!</h2>
                <p>Please log in to your account</p>

                <form onSubmit={handleLogin} className="login-form">
                    <label htmlFor="login-type">Login as:</label>
                    <select
                        id="login-type"
                        value={loginType}
                        onChange={(e) => setLoginType(e.target.value)}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <p className="signup-text">
                    Dont have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

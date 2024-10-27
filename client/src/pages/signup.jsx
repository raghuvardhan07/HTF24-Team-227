import { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css"; // Importing CSS for styling

const Signup = () => {
    const [userType, setUserType] = useState("student");
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Add logic to handle sign-up submission
        console.log(`User Type: ${userType}, Form Data: `, formData);
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Academix</h1>
                <h2>Create an Account</h2>
                <p>Join us to unlock your learning journey!</p>

                <form onSubmit={handleSubmit} className="signup-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="user-type">Sign up as:</label>
                    <select
                        id="user-type"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>

                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                </form>

                <p className="login-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

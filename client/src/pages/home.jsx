// src/home.jsx
import { Link } from "react-router-dom";
import "./home.css"; // Importing CSS for styling
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />

            <header className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Academix</h1>
                    <p>
                        Your gateway to a modern learning experience. Manage courses, track
                        progress, and grow with us.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/login" className="cta-button">
                            Get Started
                        </Link>
                        <Link to="/signup" className="cta-button secondary">
                            Join Now
                        </Link>
                    </div>
                </div>
            </header>
            <Footer />
        </div>
    );
};

export default Home;

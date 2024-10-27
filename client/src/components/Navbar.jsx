import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Academix</div>
            <div className="nav-links">
                <Link to="/login" className="nav-button">
                    Login
                </Link>
                <Link to="/signup" className="nav-button signup">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

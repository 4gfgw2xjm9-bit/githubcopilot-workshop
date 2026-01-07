import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="app-footer">
            <p>&copy; 2025 The Daily Harvest. All rights reserved.</p>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'underline', marginTop: '0.5rem', display: 'inline-block' }}>
                Contact Us
            </Link>
        </footer>
    );
};

export default Footer;

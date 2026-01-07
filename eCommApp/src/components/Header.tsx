import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="app-header glass-effect">
            <div className="header-content">
                <Link to="/" className="brand-link">
                    <span className="brand-logo">🌱</span>
                    <h1 className="brand-name">The Daily Harvest</h1>
                </Link>
                <nav className="header-nav">
                    <Link to="/" className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        <span>Home</span>
                    </Link>
                    <Link to="/products" className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                        <span>Products</span>
                    </Link>
                    <Link to="/cart" className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                        <span>Cart</span>
                    </Link>
                    <Link to="/login" className="admin-btn-link">
                        <button className="admin-pill">Admin Portal</button>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;

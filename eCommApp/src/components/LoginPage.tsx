import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            addToast('Welcome back, Admin!', 'success');
            navigate('/admin');
        } else {
            addToast('Invalid credentials. Check the harvest records.', 'error');
        }
    };

    return (
        <div className="login-container glass-effect" style={{ maxWidth: '400px', margin: '2rem auto', padding: '2.5rem' }}>
            <h2 className="premium-header">Admin Access</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="e.g. admin"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="search-input"
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button type="submit" className="submit-btn" style={{ width: '100%', marginTop: '1rem' }}>Enter Portal</button>
            </form>
        </div>
    );
};

export default LoginPage;

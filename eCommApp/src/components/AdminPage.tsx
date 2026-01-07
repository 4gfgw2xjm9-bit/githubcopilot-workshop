import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const AdminPage = () => {
    const [salePercent, setSalePercent] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('0');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { addToast } = useToast();

    return (
        <div className="admin-portal glass-effect" style={{ padding: '2.5rem' }}>
            <h2 className="premium-header">Admin Harvest Control</h2>
            <div style={{ marginTop: '2rem' }}>
                {errorMessage && (
                    <div className="error-message glass-effect" style={{ marginBottom: '1rem', padding: '0.75rem' }}>
                        <span dangerouslySetInnerHTML={{ __html: errorMessage }} />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="salePercent">Set Global Sale Percent (%) </label>
                    <input
                        id="salePercent"
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className="search-input"
                        style={{ width: '120px', display: 'inline-block', marginLeft: '1rem' }}
                    />
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => {
                            const sanitizedValue = Number(inputValue);
                            if (isNaN(sanitizedValue)) {
                                setErrorMessage(`Invalid input "${inputValue}". Please enter a number.`);
                                addToast('Failed to update sale percent', 'error');
                            } else {
                                setSalePercent(sanitizedValue);
                                setErrorMessage('');
                                addToast(`Sale set to ${sanitizedValue}% off across the store!`, 'success');
                            }
                        }}
                        className="submit-btn"
                    >
                        Apply Sale
                    </button>
                    <button
                        onClick={() => {
                            setSalePercent(0);
                            setInputValue('0');
                            setErrorMessage('');
                            addToast('All sales have ended.', 'info');
                        }}
                        className="new-message-btn"
                    >
                        End All Sales
                    </button>
                </div>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', fontWeight: '600', color: salePercent > 0 ? '#4CAF50' : '#666' }}>
                {salePercent > 0 ? `🚀 Current Status: All products are ${salePercent}% off!` : '💤 Current Status: No sale active.'}
            </p>
            <Link to="/">
                <button className="submit-btn" style={{ marginTop: '2rem', background: '#666' }}>Back to Storefront</button>
            </Link>
        </div>
    );
};

export default AdminPage;

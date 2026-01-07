import { useState } from 'react';
import { useToast } from '../context/ToastContext';

const ContactUsPage = () => {
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            message: ''
        };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
            addToast('Message sent! We will prune your request soon.', 'success');
        } else {
            addToast('Please check the form for errors.', 'error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="contact-container glass-effect" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
            <h2 className="premium-header">Get in Touch</h2>
            {isSubmitted ? (
                <div className="success-message">
                    <h3>Thank you for contacting us!</h3>
                    <p>We have received your message and will get back to you soon.</p>
                    <button onClick={() => setIsSubmitted(false)} className="new-message-btn">
                        Send another message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`search-input ${errors.name ? 'error' : ''}`}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`search-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className={`search-input ${errors.message ? 'error' : ''}`}
                            style={{ resize: 'vertical' }}
                        />
                        {errors.message && <span className="error-message">{errors.message}</span>}
                    </div>

                    <button type="submit" className="submit-btn" style={{ width: '100%' }}>Send Message</button>
                </form>
            )}
        </div>
    );
};

export default ContactUsPage;

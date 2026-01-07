import { render, screen, fireEvent, waitFor } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import ContactUsPage from './ContactUsPage';

describe('ContactUsPage', () => {
    it('renders contact form with all fields', () => {
        render(<ContactUsPage />);
        
        expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Message')).toBeInTheDocument();
        expect(screen.getByText('Send Message')).toBeInTheDocument();
    });

    it('shows validation errors when form is submitted empty', async () => {
        render(<ContactUsPage />);
        
        const submitButton = screen.getByText('Send Message');
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Message is required')).toBeInTheDocument();
        });
    });

    it('shows error for invalid email format', async () => {
        render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('Email');
        const messageInput = screen.getByLabelText('Message');
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.change(messageInput, { target: { value: 'Test message' } });
        
        const submitButton = screen.getByText('Send Message');
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        });
    });

    it('clears error when user starts typing', async () => {
        render(<ContactUsPage />);
        
        const submitButton = screen.getByText('Send Message');
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
        });
        
        const nameInput = screen.getByLabelText('Name');
        fireEvent.change(nameInput, { target: { value: 'John' } });
        
        await waitFor(() => {
            expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
        });
    });

    it('shows success message after valid form submission', async () => {
        render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('Email');
        const messageInput = screen.getByLabelText('Message');
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'This is a test message' } });
        
        const submitButton = screen.getByText('Send Message');
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Thank you for contacting us!')).toBeInTheDocument();
            expect(screen.getByText('We have received your message and will get back to you soon.')).toBeInTheDocument();
        });
    });

    it('resets form after successful submission', async () => {
        render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement;
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'This is a test message' } });
        
        const submitButton = screen.getByText('Send Message');
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Thank you for contacting us!')).toBeInTheDocument();
        });
        
        const newMessageButton = screen.getByText('Send another message');
        fireEvent.click(newMessageButton);
        
        await waitFor(() => {
            const resetNameInput = screen.getByLabelText('Name') as HTMLInputElement;
            const resetEmailInput = screen.getByLabelText('Email') as HTMLInputElement;
            const resetMessageInput = screen.getByLabelText('Message') as HTMLTextAreaElement;
            
            expect(resetNameInput.value).toBe('');
            expect(resetEmailInput.value).toBe('');
            expect(resetMessageInput.value).toBe('');
        });
    });
});

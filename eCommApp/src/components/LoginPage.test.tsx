import { render, screen, fireEvent } from '../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from './LoginPage';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('LoginPage', () => {
    it('renders the login form', () => {
        render(<LoginPage />);
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('shows error message on failed login', () => {
        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrong' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong' } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('redirects to admin on successful login', () => {
        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'admin' } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
});

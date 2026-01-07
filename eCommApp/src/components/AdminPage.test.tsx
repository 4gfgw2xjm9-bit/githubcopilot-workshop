import { render, screen, fireEvent } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import AdminPage from './AdminPage';

describe('AdminPage', () => {
    it('renders admin portal content', () => {
        render(<AdminPage />);
        expect(screen.getByText(/welcome to the admin portal/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/set sale percent/i)).toBeInTheDocument();
    });

    it('updates input value on change', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText(/set sale percent/i);
        fireEvent.change(input, { target: { value: '25' } });
        expect(input).toHaveValue('25');
    });

    it('shows error message for invalid input', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText(/set sale percent/i);
        const submitBtn = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(input, { target: { value: 'invalid' } });
        fireEvent.click(submitBtn);

        expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
        expect(screen.getByText(/please enter a valid number/i)).toBeInTheDocument();
    });

    it('activates and ends sale', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText(/set sale percent/i);
        const submitBtn = screen.getByRole('button', { name: /submit/i });
        const endSaleBtn = screen.getByRole('button', { name: /end sale/i });

        // Submit sale
        fireEvent.change(input, { target: { value: '15' } });
        fireEvent.click(submitBtn);
        expect(screen.getByText(/all products are 15% off/i)).toBeInTheDocument();

        // End sale
        fireEvent.click(endSaleBtn);
        expect(screen.getByText(/no sale active/i)).toBeInTheDocument();
        expect(input).toHaveValue('0');
    });
});

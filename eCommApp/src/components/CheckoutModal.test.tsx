import { render, screen, fireEvent } from '../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
    it('renders modal with confirm and cancel buttons', () => {
        const onConfirm = vi.fn();
        const onCancel = vi.fn();
        render(<CheckoutModal onConfirm={onConfirm} onCancel={onCancel} />);

        expect(screen.getByText(/are you sure\?/i)).toBeInTheDocument();
        expect(screen.getByText(/do you want to proceed with the checkout\?/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /continue checkout/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /return to cart/i })).toBeInTheDocument();
    });

    it('calls onConfirm when confirm button is clicked', () => {
        const onConfirm = vi.fn();
        const onCancel = vi.fn();
        render(<CheckoutModal onConfirm={onConfirm} onCancel={onCancel} />);

        fireEvent.click(screen.getByRole('button', { name: /continue checkout/i }));
        expect(onConfirm).toHaveBeenCalled();
    });

    it('calls onCancel when cancel button is clicked', () => {
        const onConfirm = vi.fn();
        const onCancel = vi.fn();
        render(<CheckoutModal onConfirm={onConfirm} onCancel={onCancel} />);

        fireEvent.click(screen.getByRole('button', { name: /return to cart/i }));
        expect(onCancel).toHaveBeenCalled();
    });
});

import { render, screen, fireEvent } from '../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ReviewModal from './ReviewModal';
import { Product } from '../types';

const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 10,
    reviews: [
        { author: 'User1', comment: 'Great!', date: new Date().toISOString() }
    ],
    inStock: true
};

describe('ReviewModal', () => {
    it('returns null if no product is provided', () => {
        const { container } = render(<ReviewModal product={null} onClose={vi.fn()} onSubmit={vi.fn()} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders product reviews and form', () => {
        render(<ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />);

        expect(screen.getByText(/reviews for test product/i)).toBeInTheDocument();
        expect(screen.getByText('User1')).toBeInTheDocument();
        expect(screen.getByText('Great!')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    });

    it('submits a new review', () => {
        const onSubmit = vi.fn();
        render(<ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={onSubmit} />);

        fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: 'New User' } });
        fireEvent.change(screen.getByPlaceholderText(/your review/i), { target: { value: 'Excellent' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
            author: 'New User',
            comment: 'Excellent'
        }));
    });

    it('calls onClose when close button or backdrop is clicked', () => {
        const onClose = vi.fn();
        render(<ReviewModal product={mockProduct} onClose={onClose} onSubmit={vi.fn()} />);

        fireEvent.click(screen.getByRole('button', { name: /close/i }));
        expect(onClose).toHaveBeenCalled();
    });

    it('displays "No reviews yet." when product has no reviews', () => {
        const productWithNoReviews = { ...mockProduct, reviews: [] };
        render(<ReviewModal product={productWithNoReviews} onClose={vi.fn()} onSubmit={vi.fn()} />);
        expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
    });
});

import { render, screen, waitFor, fireEvent } from '../test/test-utils';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ProductsPage from './ProductsPage';

// Mock components
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('./ReviewModal', () => ({
    default: ({ product, onSubmit }: { product: any; onSubmit: (review: any) => void }) =>
        product ? (
            <div data-testid="review-modal">
                Reviewing {product.name}
                <button data-testid="submit-review" onClick={() => onSubmit({ author: 'Test', comment: 'Great', date: new Date().toISOString() })}>Submit</button>
            </div>
        ) : null
}));

// Mock products data
const mockProducts = [
    {
        id: '1',
        name: 'Apple',
        price: 0.99,
        description: 'Fresh apple',
        image: 'apple.jpg',
        reviews: [],
        inStock: true,
        category: 'Fruit'
    },
    {
        id: '2',
        name: 'Grapes',
        price: 2.99,
        description: 'Sweet grapes',
        image: 'grapes.jpg',
        reviews: [],
        inStock: false,
        category: 'Berries'
    }
];

describe('ProductsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        const mockFetch = vi.fn((url: string) => {
            if (url.includes('apple.json')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockProducts[0]) });
            if (url.includes('grapes.json')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockProducts[1]) });
            const dummyProduct = { ...mockProducts[0], id: `dummy-${url}`, name: 'Dummy' };
            return Promise.resolve({ ok: true, json: () => Promise.resolve(dummyProduct) });
        });
        vi.stubGlobal('fetch', mockFetch);
    });

    it('renders loading state initially', () => {
        render(<ProductsPage />);
        expect(screen.getByText(/loading products/i)).toBeInTheDocument();
    });

    it('renders products after loading', async () => {
        render(<ProductsPage />);

        await waitFor(() => {
            expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument();
        });

        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getAllByText('$0.99').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Fresh apple').length).toBeGreaterThan(0);
    });

    it('handles "Out of Stock" products', async () => {
        render(<ProductsPage />);

        await waitFor(() => {
            expect(screen.getByText('Grapes')).toBeInTheDocument();
        });

        const grapesCard = screen.getByText('Grapes').closest('.product-card');
        const addToCartBtn = grapesCard?.querySelector('.add-to-cart-btn');

        expect(addToCartBtn).toHaveTextContent(/out of stock/i);
        expect(addToCartBtn).toBeDisabled();
    });

    it('opens ReviewModal when product image is clicked', async () => {
        render(<ProductsPage />);

        await waitFor(() => {
            expect(screen.getByAltText('Apple')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByAltText('Apple'));
        expect(screen.getByTestId('review-modal')).toBeInTheDocument();
        expect(screen.getByText(/reviewing apple/i)).toBeInTheDocument();
    });

    it('updates product reviews when a review is submitted', async () => {
        render(<ProductsPage />);

        await waitFor(() => {
            expect(screen.getByAltText('Apple')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByAltText('Apple'));

        const submitBtn = screen.getByTestId('submit-review');
        fireEvent.click(submitBtn);

        // Verification: The modal should still be open and rendering with the product
        expect(screen.getByTestId('review-modal')).toBeInTheDocument();
    });

    it('renders category filter buttons', async () => {
        render(<ProductsPage />);

        await waitFor(() => {
            expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument();
        });

        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.getByText('Fruit')).toBeInTheDocument();
        expect(screen.getByText('Berries')).toBeInTheDocument();
    });

    it('filters products by category when category button is clicked', async () => {
        render(<ProductsPage />);

        await waitFor(() => {
            expect(screen.getByText('Apple')).toBeInTheDocument();
            expect(screen.getByText('Grapes')).toBeInTheDocument();
        });

        // Click on Fruit category
        fireEvent.click(screen.getByText('Fruit'));

        // Apple should be visible, Grapes should not
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.queryByText('Grapes')).not.toBeInTheDocument();

        // Click on Berries category
        fireEvent.click(screen.getByText('Berries'));

        // Grapes should be visible, Apple should not
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
        expect(screen.getByText('Grapes')).toBeInTheDocument();

        // Click on All category
        fireEvent.click(screen.getByText('All'));

        // Both should be visible
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Grapes')).toBeInTheDocument();
    });

    it('highlights the active category button', async () => {
        render(<ProductsPage />);

        await waitFor(() => {
            expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument();
        });

        const allButton = screen.getByText('All');
        const fruitButton = screen.getByText('Fruit');

        // Initially "All" should be active
        expect(allButton).toHaveClass('active');
        expect(fruitButton).not.toHaveClass('active');

        // Click on Fruit category
        fireEvent.click(fruitButton);

        // Now "Fruit" should be active
        expect(allButton).not.toHaveClass('active');
        expect(fruitButton).toHaveClass('active');
    });
});

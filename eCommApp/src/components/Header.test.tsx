import { render, screen } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header', () => {
    it('renders navigation links', () => {
        render(<Header />);
        expect(screen.getByText('The Daily Harvest')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByText('Cart')).toBeInTheDocument();
        expect(screen.getByText('Admin Login')).toBeInTheDocument();
    });
});

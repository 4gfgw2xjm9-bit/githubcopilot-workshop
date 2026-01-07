import { render, screen } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import HomePage from './HomePage';

describe('HomePage', () => {
    it('renders hero section and calls to action', () => {
        render(<HomePage />);
        expect(screen.getByText(/welcome to the the daily harvest/i)).toBeInTheDocument();
        expect(screen.getByText(/check out our products page/i)).toBeInTheDocument();
    });
});

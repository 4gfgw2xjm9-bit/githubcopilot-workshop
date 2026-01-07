import { render, screen } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
    it('renders copyright information', () => {
        render(<Footer />);
        expect(screen.getByText(/© 2025 The Daily Harvest/i)).toBeInTheDocument();
    });
});

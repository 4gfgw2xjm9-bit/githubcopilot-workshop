import { describe, it, expect } from 'vitest';
import { formatPrice, calculateTotal, validateEmail } from './helpers';

describe('helpers utility functions', () => {
    describe('formatPrice', () => {
        it('formats number to USD currency string', () => {
            expect(formatPrice(10)).toBe('$10.00');
            expect(formatPrice(29.99)).toBe('$29.99');
            expect(formatPrice(0.5)).toBe('$0.50');
        });

        it('handles zero and negative values', () => {
            expect(formatPrice(0)).toBe('$0.00');
            // Depending on implementation, negative might be -$1.00 or ($1.00)
            // Intl.NumberFormat usually does -$1.00
            expect(formatPrice(-1)).toBe('-$1.00');
        });
    });

    describe('calculateTotal', () => {
        it('calculates the total for multiple items', () => {
            const items = [
                { price: 10, quantity: 2 },
                { price: 5, quantity: 1 },
                { price: 0.5, quantity: 4 }
            ];
            expect(calculateTotal(items)).toBe(27);
        });

        it('returns 0 for an empty array', () => {
            expect(calculateTotal([])).toBe(0);
        });

        it('handles zero quantity or zero price', () => {
            expect(calculateTotal([{ price: 10, quantity: 0 }])).toBe(0);
            expect(calculateTotal([{ price: 0, quantity: 10 }])).toBe(0);
        });
    });

    describe('validateEmail', () => {
        it('returns true for valid email addresses', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
        });

        it('returns false for invalid email addresses', () => {
            expect(validateEmail('test@example')).toBe(false);
            expect(validateEmail('testexample.com')).toBe(false);
            expect(validateEmail('@domain.com')).toBe(false);
            expect(validateEmail('test@.com')).toBe(false);
            expect(validateEmail('')).toBe(false);
        });
    });
});

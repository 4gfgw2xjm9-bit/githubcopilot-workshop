import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, CartContext } from './CartContext';
import React from 'react';

// Wrapper component for the hook
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
    const mockProduct = {
        id: '1',
        name: 'Test Apple',
        price: 0.50,
        reviews: [],
        inStock: true
    };

    it('starts with an empty cart', () => {
        const { result } = renderHook(() => React.useContext(CartContext), { wrapper });
        expect(result.current?.cartItems).toEqual([]);
    });

    it('adds a new item to the cart', () => {
        const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

        act(() => {
            result.current?.addToCart(mockProduct);
        });

        expect(result.current?.cartItems).toHaveLength(1);
        expect(result.current?.cartItems[0]).toEqual({ ...mockProduct, quantity: 1 });
    });

    it('increments quantity when adding the same item twice', () => {
        const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

        act(() => {
            result.current?.addToCart(mockProduct);
            result.current?.addToCart(mockProduct);
        });

        expect(result.current?.cartItems).toHaveLength(1);
        expect(result.current?.cartItems[0].quantity).toBe(2);
    });

    it('clears the cart', () => {
        const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

        act(() => {
            result.current?.addToCart(mockProduct);
            result.current?.clearCart();
        });

        expect(result.current?.cartItems).toEqual([]);
    });
});

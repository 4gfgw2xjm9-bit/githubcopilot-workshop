import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const productFiles = [
                'apple.json',
                'grapes.json',
                'orange.json',
                'pear.json'
            ];
            const productPromises = productFiles.map(async (file) => {
                const response = await fetch(`products/${file}`);
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return await response.json();
            });
            const loadedProducts = await Promise.all(productPromises);
            setProducts(loadedProducts);
        } catch (err) {
            console.error('Error loading products:', err);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return { products, loading, error, setProducts, refetch: loadProducts };
};

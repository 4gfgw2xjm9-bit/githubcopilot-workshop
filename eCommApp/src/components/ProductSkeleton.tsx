import React from 'react';
import './ProductSkeleton.css';

const ProductSkeleton: React.FC = () => {
    return (
        <div className="product-card skeleton-container">
            <div className="skeleton-image shimmer"></div>
            <div className="product-info">
                <div className="skeleton-text skeleton-title shimmer"></div>
                <div className="skeleton-text skeleton-price shimmer"></div>
                <div className="skeleton-text skeleton-desc shimmer"></div>
                <div className="skeleton-text skeleton-desc shimmer" style={{ width: '80%' }}></div>
                <div className="skeleton-button shimmer"></div>
            </div>
        </div>
    );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
    return (
        <div className="products-grid">
            {Array.from({ length: count }).map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
};

export default ProductSkeleton;

import { useState, useContext } from 'react';
import { Review } from '../types';
import ReviewModal from './ReviewModal';
import { CartContext } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { useToast } from '../context/ToastContext';
import { ProductGridSkeleton } from './ProductSkeleton';
import './ProductsPage.css';

const ProductsPage = () => {
    const { products, loading, setProducts } = useProducts();
    const { addToast } = useToast();
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }

    const { addToCart } = cartContext;

    const handleAddToCart = (product: any) => {
        addToCart(product);
        addToast(`${product.name} added to harvest!`, 'success');
    };

    const handleReviewSubmit = (review: Review) => {
        if (selectedProduct) {
            const updatedProduct = {
                ...selectedProduct,
                reviews: [review, ...selectedProduct.reviews],
            };
            const updatedProducts = products.map(p =>
                p.id === updatedProduct.id ? updatedProduct : p
            );
            setProducts(updatedProducts);
            setSelectedProduct(updatedProduct);
            addToast('Review submitted successfully!', 'success');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="products-container">
            <h2 className="premium-header">Our Products</h2>
            <div className="search-container glass-effect" style={{ marginBottom: '2rem', padding: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search fresh products by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {loading ? (
                <ProductGridSkeleton count={4} />
            ) : filteredProducts.length === 0 ? (
                <div className="no-products-message">
                    <p>No products found in the current harvest. Try another search!</p>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div key={product.id || product.name} className="product-card glass-effect hover-lift">
                            {product.image && (
                                <div className="product-image-wrapper">
                                    <img
                                        src={`products/productImages/${product.image}`}
                                        alt={product.name}
                                        className="product-image"
                                        onClick={() => setSelectedProduct(product)}
                                    />
                                </div>
                            )}
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">${product.price.toFixed(2)}</p>
                                {product.description && (
                                    <p className="product-description">{product.description}</p>
                                )}
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className={`add-to-cart-btn ${product.inStock ? '' : 'disabled'}`}
                                    disabled={!product.inStock}
                                >
                                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ReviewModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onSubmit={handleReviewSubmit}
            />
        </div>
    );
};


export default ProductsPage;

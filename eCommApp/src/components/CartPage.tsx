import { useContext, useState } from 'react';
import { CartContext, CartItem } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import { useToast } from '../context/ToastContext';

const CartPage = () => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderProcessed, setOrderProcessed] = useState(false);
    const [processedItems, setProcessedItems] = useState<CartItem[]>([]);
    const { addToast } = useToast();
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }

    const { cartItems, clearCart } = cartContext;

    const handleCheckout = () => {
        setIsCheckingOut(true);
    };

    const handleConfirmCheckout = () => {
        setProcessedItems([...cartItems]);
        clearCart();
        setIsCheckingOut(false);
        setOrderProcessed(true);
        addToast('Order submitted successfully! Fresh produce is on its way.', 'success');
    };

    if (orderProcessed) {
        return (
            <div className="order-processed-container">
                <h2 className="premium-header">Your order has been processed!</h2>
                <div className="cart-items-grid">
                    {processedItems.map(item => (
                        <div key={item.id} className="cart-item-card glass-effect">
                            <img src={`products/productImages/${item.image}`} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="premium-header">Your Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-state glass-effect" style={{ padding: '2rem', textAlign: 'center' }}>
                    <p>Your cart is empty. The harvest awaits!</p>
                </div>
            ) : (
                <>
                    <div className="cart-items-grid">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item-card glass-effect hover-lift">
                                <img src={`products/productImages/${item.image}`} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
                </>
            )}
            {isCheckingOut && (
                <CheckoutModal
                    onConfirm={handleConfirmCheckout}
                    onCancel={() => setIsCheckingOut(false)}
                />
            )}
        </div>
    );
};

export default CartPage;

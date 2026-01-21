import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart, cartCount } = useCart();
    const { user } = useAuth();

    // Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    const shippingPrice = addDecimals(itemsPrice > 500 ? 0 : 50);
    const taxPrice = addDecimals(Number((0.18 * itemsPrice).toFixed(2))); // 18% GST
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    const paymentMethod = localStorage.getItem('paymentMethod');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (!shippingAddress) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [user, navigate, shippingAddress, paymentMethod]);

    const placeOrderHandler = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    orderItems: cartItems.map(item => ({
                        name: item.name,
                        qty: item.qty,
                        image: item.image,
                        price: item.price,
                        product: item.id, // Map id to product
                    })),
                    shippingAddress: {
                        address: shippingAddress.street,
                        city: shippingAddress.city,
                        postalCode: shippingAddress.zip,
                        country: shippingAddress.country,
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                clearCart();
                // Navigate to orders page or order details page
                navigate('/orders');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to place order');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-10 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Details */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Shipping */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Shipping</h2>
                            <p className="mb-1"><strong className="text-gray-600">Address:</strong></p>
                            <p className="text-gray-700">
                                {shippingAddress?.street}, {shippingAddress?.city}, {shippingAddress?.state}, {shippingAddress?.zip}, {shippingAddress?.country}
                            </p>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Payment Method</h2>
                            <p className="text-gray-700"><strong className="text-gray-600">Method:</strong> {paymentMethod}</p>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Order Items</h2>
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                            <div className="flex items-center">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                                                <Link to={`/product/${item.id}`} className="text-gray-800 hover:text-green-600 font-medium">
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div className="text-gray-600">
                                                {item.qty} x ₹{item.price} = <span className="font-bold text-gray-800">₹{item.qty * item.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Order Summary</h2>
                            <div className="space-y-3 text-sm border-b pb-4 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Items (Tax excl.):</span>
                                    <span>₹{itemsPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping:</span>
                                    <span>₹{shippingPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax (18% GST):</span>
                                    <span>₹{taxPrice}</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-gray-800 mb-6">
                                <span>Total:</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition shadow-md flex items-center justify-center disabled:opacity-50"
                                disabled={cartItems.length === 0}
                                onClick={placeOrderHandler}
                            >
                                <CheckCircle className="w-5 h-5 mr-2" /> Place Order
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default PlaceOrder;

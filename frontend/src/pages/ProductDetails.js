import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import { Star, Truck, RefreshCw, Shield, Check } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
                        <button onClick={() => navigate('/products')} className="mt-4 text-green-600 hover:underline">
                            Return to Products
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 2000);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-500 mb-6">
                        <span className="hover:text-green-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
                        <span className="mx-2">/</span>
                        <span className="hover:text-green-600 cursor-pointer" onClick={() => navigate('/products')}>Products</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800 font-medium">{product.name}</span>
                    </div>

                    {/* Main Product Section */}
                    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Image Section */}
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-96 object-contain rounded-lg border border-gray-100"
                                />
                                {product.discount && (
                                    <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        {product.discount}
                                    </span>
                                )}
                            </div>

                            {/* Product Info Section */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline space-x-3">
                                        <span className="text-4xl font-bold text-green-600">₹{product.price}</span>
                                        {product.oldPrice && (
                                            <span className="text-xl text-gray-400 line-through">₹{product.oldPrice}</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                                {/* Availability */}
                                <div className="mb-6 flex items-center">
                                    <Check className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-green-700 font-medium">In Stock</span>
                                </div>

                                {/* Quantity Selector */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4 mb-6">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-md"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md"
                                    >
                                        Buy Now
                                    </button>
                                </div>

                                {showAddedMessage && (
                                    <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg">
                                        ✓ Added to cart successfully!
                                    </div>
                                )}

                                {/* Delivery Info */}
                                <div className="border-t pt-6 space-y-3">
                                    <div className="flex items-start">
                                        <Truck className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-800">Free Delivery</p>
                                            <p className="text-sm text-gray-600">On orders above ₹500</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <RefreshCw className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-800">7 Days Return</p>
                                            <p className="text-sm text-gray-600">Return or exchange within 7 days</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Shield className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-800">100% Authentic</p>
                                            <p className="text-sm text-gray-600">Farm fresh quality guaranteed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Specifications */}
                    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-b pb-3">
                                <span className="font-semibold text-gray-700">Category:</span>
                                <span className="ml-2 text-gray-600">{product.category}</span>
                            </div>
                            <div className="border-b pb-3">
                                <span className="font-semibold text-gray-700">Brand:</span>
                                <span className="ml-2 text-gray-600">FreshDairy</span>
                            </div>
                            <div className="border-b pb-3">
                                <span className="font-semibold text-gray-700">Storage:</span>
                                <span className="ml-2 text-gray-600">Keep Refrigerated at 4°C</span>
                            </div>
                            <div className="border-b pb-3">
                                <span className="font-semibold text-gray-700">Shelf Life:</span>
                                <span className="ml-2 text-gray-600">3-5 days from delivery</span>
                            </div>
                            <div className="border-b pb-3">
                                <span className="font-semibold text-gray-700">Packaging:</span>
                                <span className="ml-2 text-gray-600">Food-grade plastic bottle</span>
                            </div>
                            <div className="border-b pb-3">
                                <span className="font-semibold text-gray-700">Origin:</span>
                                <span className="ml-2 text-gray-600">Local Dairy Farms</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Reviews */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>

                        {/* Review Summary */}
                        <div className="flex items-center mb-8 pb-8 border-b">
                            <div className="text-center pr-8 border-r">
                                <div className="text-5xl font-bold text-gray-800">{product.rating}.0</div>
                                <div className="flex items-center justify-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{product.reviews} ratings</p>
                            </div>
                            <div className="pl-8 flex-1">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center mb-2">
                                        <span className="text-sm w-12">{star} ★</span>
                                        <div className="flex-1 bg-gray-200 h-2 rounded-full mx-3">
                                            <div
                                                className="bg-yellow-400 h-2 rounded-full"
                                                style={{ width: `${star === product.rating ? '70%' : star === product.rating - 1 ? '20%' : '5%'}` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600 w-12">
                                            {star === product.rating ? Math.floor(product.reviews * 0.7) : star === product.rating - 1 ? Math.floor(product.reviews * 0.2) : Math.floor(product.reviews * 0.05)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sample Reviews */}
                        <div className="space-y-6">
                            <div className="border-b pb-6">
                                <div className="flex items-center mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="ml-2 font-semibold text-gray-800">Excellent Product!</span>
                                </div>
                                <p className="text-gray-600 mb-2">Very fresh and high quality. Delivery was prompt and packaging was great.</p>
                                <p className="text-sm text-gray-500">- Verified Purchase</p>
                            </div>
                            <div className="border-b pb-6">
                                <div className="flex items-center mb-2">
                                    <div className="flex">
                                        {[...Array(4)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                        <Star className="w-4 h-4 text-gray-300" />
                                    </div>
                                    <span className="ml-2 font-semibold text-gray-800">Good Quality</span>
                                </div>
                                <p className="text-gray-600 mb-2">Tastes great and kids love it. Would recommend!</p>
                                <p className="text-sm text-gray-500">- Verified Purchase</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;

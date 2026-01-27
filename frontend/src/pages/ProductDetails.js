import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Star, Check, Truck, RefreshCw, Shield } from 'lucide-react';
import products from '../data/products';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    // Find product from local data
    const product = products.find(p => p.id === parseInt(id));


    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 3000);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

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
                                        {product.discount}%
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
                                    <span className="ml-2 text-gray-600">({product.reviews || 0} reviews)</span>
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between py-2 border-b">
                                <span className="font-medium text-gray-700">Category</span>
                                <span className="text-gray-600">{product.category}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="font-medium text-gray-700">Brand</span>
                                <span className="text-gray-600">Fresh Dairy</span>
                            </div>
                        </div>
                    </div>

                    {/* Ratings & Reviews Section */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>

                        {/* Ratings Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b">
                            {/* Overall Rating */}
                            <div className="text-center">
                                <div className="text-5xl font-bold text-gray-800 mb-2">{product.rating}.0</div>
                                <div className="flex items-center justify-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-6 h-6 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600">{product.reviews || 0} Reviews</p>
                            </div>

                            {/* Rating Breakdown */}
                            <div className="md:col-span-2 space-y-2">
                                {[5, 4, 3, 2, 1].map(stars => {
                                    const percentage = stars === product.rating ? 75 : stars === product.rating - 1 ? 15 : 5;
                                    return (
                                        <div key={stars} className="flex items-center space-x-3">
                                            <span className="text-sm text-gray-600 w-8">{stars} ★</span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-yellow-400 h-2 rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Individual Reviews */}
                        <div className="space-y-6">
                            {/* Review 1 */}
                            <div className="border-b pb-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                                                A
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">Ananya Sharma</h4>
                                                <p className="text-xs text-gray-500">Verified Purchase</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">2 days ago</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Excellent quality! The {product.name.toLowerCase()} is fresh and tastes amazing.
                                    Packaging was perfect and delivery was on time. Highly recommend!
                                </p>
                            </div>

                            {/* Review 2 */}
                            <div className="border-b pb-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                                                R
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">Rohan Patel</h4>
                                                <p className="text-xs text-gray-500">Verified Purchase</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">1 week ago</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Good product overall. Fresh and reasonably priced. Would have given 5 stars if the delivery was a bit faster.
                                </p>
                            </div>

                            {/* Review 3 */}
                            <div className="pb-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
                                                P
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">Priya Desai</h4>
                                                <p className="text-xs text-gray-500">Verified Purchase</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">2 weeks ago</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Best quality dairy products! Been ordering for months now. Always fresh, always delivered on time.
                                    Customer service is also very responsive. Keep up the great work!
                                </p>
                            </div>
                        </div>

                        {/* Write Review Button */}
                        <div className="mt-6 pt-6 border-t">
                            <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
                                Write a Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;

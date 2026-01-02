import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over 500 example
  const total = subtotal + shipping;

  const EmptyCart = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-green-50 p-6 rounded-full mb-6">
        <ShoppingBag className="w-16 h-16 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
      <p className="text-gray-600 mb-8 max-w-sm">
        Looks like you haven't added any fresh dairy products yet.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl"
      >
        Start Shopping
        <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Product List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-100 mb-4 sm:mb-0 sm:mr-6"
                    />
                    <div className="flex-1 text-center sm:text-left w-full">
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <div className="font-medium text-green-700 flex items-center justify-center sm:justify-start">
                        <span className="text-lg">₹{item.price}</span>
                        <span className="text-gray-400 mx-2">×</span>
                        <span className="text-gray-800">{item.qty}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-end mt-4 sm:mt-0 ml-0 sm:ml-6 w-full sm:w-auto">
                      <div className="text-xl font-bold text-gray-900 mb-4">
                        ₹{Number(item.price) * item.qty}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center text-sm text-red-500 hover:text-red-700 font-medium transition p-2 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}
                      </span>
                    </div>
                  </div>
                  <div className="border-t pt-4 mt-6 flex justify-between items-center text-gray-900">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-green-700">₹{total}</span>
                  </div>
                  <button className="w-full bg-green-600 text-white mt-8 py-4 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center shadow-lg hover:shadow-xl transform active:scale-95 duration-150">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

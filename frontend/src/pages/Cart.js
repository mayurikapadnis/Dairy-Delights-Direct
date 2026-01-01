import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-16 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-gray-600 text-lg bg-white rounded p-8 shadow mx-auto w-full text-center">
            No products in the cart.
          </div>
        ) : (
          <div className="space-y-5">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center bg-white rounded-lg shadow p-5 mb-2 hover:shadow-lg transition relative"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mr-4 border"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="text-gray-500 text-xs mb-1">{item.category}</div>
                  <div className="font-medium text-green-700">
                    ₹{item.price}
                    <span className="text-gray-400 ml-2">× {item.qty}</span>
                  </div>
                </div>
                <div className="text-xl font-bold text-green-700 ml-6">
                  ₹{Number(item.price) * item.qty}
                </div>
                <button
                  className="absolute top-3 right-3 bg-gray-200 hover:bg-red-500 p-1 px-3 rounded-full text-xs font-semibold text-gray-600 hover:text-white transition"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-8 px-2">
              <div className="font-semibold text-lg">Total:</div>
              <div className="text-2xl font-bold text-green-700">₹{total}</div>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold mt-4 shadow">
              Checkout
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CreditCard, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const shippingAddress = localStorage.getItem('shippingAddress');
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [user, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('paymentMethod', paymentMethod);
        navigate('/placeorder');
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-10 px-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                        <CreditCard className="mr-2 text-green-600" /> Payment Method
                    </h1>

                    <form onSubmit={submitHandler}>
                        <div className="space-y-4 mb-8">
                            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-200 transition">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="CashOnDelivery"
                                    checked={paymentMethod === 'CashOnDelivery'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                                />
                                <div className="ml-3 flex items-center">
                                    <Truck className="w-5 h-5 text-gray-500 mr-2" />
                                    <span className="font-medium text-gray-700">Cash on Delivery</span>
                                </div>
                            </label>

                            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-200 transition">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="UPI"
                                    checked={paymentMethod === 'UPI'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                                />
                                <div className="ml-3">
                                    <span className="font-medium text-gray-700">UPI / QR Code</span>
                                </div>
                            </label>

                            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-200 transition">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Card"
                                    checked={paymentMethod === 'Card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                                />
                                <div className="ml-3">
                                    <span className="font-medium text-gray-700">Credit / Debit Card</span>
                                </div>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Payment;

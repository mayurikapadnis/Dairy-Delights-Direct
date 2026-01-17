import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Package, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders/myorders', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-10 px-4">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <Package className="mr-3 text-green-600" /> My Orders
                    </h1>

                    {loading ? (
                        <p>Loading orders...</p>
                    ) : orders.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <XCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-700">No orders found</h2>
                            <p className="text-gray-500 mt-2">Looks like you haven't placed any orders yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b pb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Order ID</p>
                                            <p className="font-mono text-gray-800">{order._id}</p>
                                        </div>
                                        <div className="mt-4 md:mt-0 text-right">
                                            <p className="text-sm text-gray-500">Placed on</p>
                                            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-gray-200 mr-4" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                                                    <p className="text-sm text-gray-600">Qty: {item.qty} x ₹{item.price}</p>
                                                </div>
                                                <div className="font-bold text-gray-800">₹{item.qty * item.price}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t pt-4 mt-4 flex flex-col md:flex-row justify-between items-center bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                                        <div className="flex space-x-6 text-sm">
                                            <div>
                                                <span className="text-gray-500 block">Total Amount</span>
                                                <span className="font-bold text-lg">₹{order.totalPrice}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block">Payment</span>
                                                <span className={`font-bold px-2 py-0.5 rounded text-xs ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {order.isPaid ? 'PAID' : 'PENDING'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block">Status</span>
                                                <span className={`font-bold px-2 py-0.5 rounded text-xs ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {order.isDelivered ? 'DELIVERED' : 'PROCESSING'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Orders;

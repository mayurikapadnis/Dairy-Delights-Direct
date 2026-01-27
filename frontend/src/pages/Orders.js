import React, { useEffect, useState } from 'react';
import AccountLayout from '../components/AccountLayout';
import { useAuth } from '../context/AuthContext';
import { Package, XCircle, Calendar, CreditCard, Truck } from 'lucide-react';
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
        <AccountLayout>
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-8">
                    <Package className="w-8 h-8 text-green-600" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
                        <p className="text-gray-500 text-sm mt-1">Track and manage your orders</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <XCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
                                {/* Order Header */}
                                <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Order ID</p>
                                            <p className="font-mono text-sm text-gray-800 font-semibold">{order._id.slice(-8)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1 flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                Placed On
                                            </p>
                                            <p className="font-medium text-gray-800">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Total Amount</p>
                                            <p className="text-2xl font-bold text-green-600">₹{order.totalPrice}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="space-y-4 mb-6">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">Qty: {item.qty} × ₹{item.price}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-800">₹{item.qty * item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Footer Status */}
                                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                                        <div className="flex items-center space-x-2">
                                            <CreditCard className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Payment</p>
                                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${order.isPaid
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {order.isPaid ? 'PAID' : 'PENDING'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Truck className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Delivery</p>
                                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${order.isDelivered
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {order.isDelivered ? 'DELIVERED' : 'PROCESSING'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1"></div>
                                        <button className="px-6 py-2 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100 transition">
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AccountLayout>
    );
};

export default Orders;

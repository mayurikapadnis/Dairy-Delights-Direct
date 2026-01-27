import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';

const AccountLayout = ({ children }) => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems = [
        { path: '/profile', label: 'My Profile', icon: User },
        { path: '/orders', label: 'My Orders', icon: Package },
        { path: '/shipping', label: 'Manage Addresses', icon: MapPin },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
                                {/* User Info Header */}
                                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-700 font-bold text-2xl shadow-lg">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{user?.name}</h3>
                                            <p className="text-green-100 text-sm">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Menu */}
                                <nav className="p-4">
                                    <ul className="space-y-2">
                                        {menuItems.map(({ path, label, icon: Icon }) => (
                                            <li key={path}>
                                                <Link
                                                    to={path}
                                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(path)
                                                            ? 'bg-green-50 text-green-700 font-semibold shadow-sm'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                                                        }`}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                    <span>{label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <button
                                            onClick={logout}
                                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span className="font-medium">Logout</span>
                                        </button>
                                    </div>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AccountLayout;

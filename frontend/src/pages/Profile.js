import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, MapPin, Package } from 'lucide-react';

function Profile() {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        fetch('http://localhost:5000/api/users/profile', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        })
            .then(res => res.json())
            .then(data => setUserProfile(data))
            .catch(err => console.error(err));
    }, [navigate, userInfo]);

    if (!userProfile) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-10 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Sidebar */}
                    <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                        <div className="flex items-center space-x-4 mb-6 border-b pb-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <User className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Hello,</p>
                                <p className="font-bold text-gray-800">{userProfile.name}</p>
                            </div>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <Link to="/profile" className="flex items-center space-x-3 text-green-600 font-medium cursor-pointer bg-green-50 p-2 rounded">
                                <User className="w-5 h-5" /> <span>My Profile</span>
                            </Link>
                            <Link to="/orders" className="flex items-center space-x-3 hover:text-green-600 cursor-pointer p-2">
                                <Package className="w-5 h-5" /> <span>My Orders</span>
                            </Link>
                            <Link to="/shipping" className="flex items-center space-x-3 hover:text-green-600 cursor-pointer p-2">
                                <MapPin className="w-5 h-5" /> <span>Manage Addresses</span>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3 bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Information</h2>

                        <div className="mb-8">
                            <label className="block text-gray-500 text-sm mb-1">Email Address</label>
                            <input type="text" value={userProfile.email} disabled className="w-full max-w-md p-3 bg-gray-50 border rounded text-gray-700" />
                        </div>

                        <h2 className="text-2xl font-bold mb-6 text-gray-800 mt-10">Saved Addresses</h2>
                        {userProfile.addresses && userProfile.addresses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {userProfile.addresses.map((addr, idx) => (
                                    <div key={idx} className="border p-4 rounded hover:shadow-md transition">
                                        <span className="bg-gray-200 text-xs px-2 py-1 rounded text-gray-600 font-bold">HOME</span>
                                        <p className="font-bold mt-2">{userProfile.name}</p>
                                        <p className="text-sm text-gray-600 mt-1">{addr.street}, {addr.city} - {addr.zip}</p>
                                        <p className="text-sm text-gray-600">{addr.state}, {addr.country}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No addresses saved yet.</p>
                        )}

                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountLayout from '../components/AccountLayout';
import { Mail, MapPin, Edit2, Plus } from 'lucide-react';

function Profile() {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: '' });

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo) {
            navigate('/login');
            return;
        }

        fetch('http://localhost:5000/api/users/profile', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        })
            .then(res => res.json())
            .then(data => {
                setUserProfile(data);
                setEditData({ name: data.name });
            })
            .catch(err => console.error(err));
    }, [navigate]); // Only navigate in dependencies

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        try {
            const response = await fetch('http://localhost:5000/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify(editData),
            });
            const data = await response.json();
            setUserProfile(data);
            setIsEditing(false);

            const updatedUserInfo = { ...userInfo, name: data.name };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        } catch (err) {
            console.error(err);
            alert('Failed to update profile');
        }
    };

    if (!userProfile) {
        return (
            <AccountLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
            </AccountLayout>
        );
    }

    return (
        <AccountLayout>
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span className="font-medium">{isEditing ? 'Cancel' : 'Edit'}</span>
                    </button>
                </div>

                {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <span>{userProfile.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-3 pt-2">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Full Name</label>
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium">
                                {userProfile.name}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span>{userProfile.email}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Saved Addresses Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage your delivery addresses</p>
                    </div>
                    <button
                        onClick={() => navigate('/shipping')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="font-medium">Add Address</span>
                    </button>
                </div>

                {userProfile.addresses && userProfile.addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userProfile.addresses.map((addr, idx) => (
                            <div key={idx} className="group border-2 border-gray-200 rounded-xl p-5 hover:border-green-300 hover:shadow-md transition-all duration-200">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                                        HOME
                                    </span>
                                    <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-green-600 transition">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-gray-800">{userProfile.name}</p>
                                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                            {addr.street}
                                            <br />
                                            {addr.city}, {addr.state} - {addr.zip}
                                            <br />
                                            {addr.country}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-4">No addresses saved yet</p>
                        <button
                            onClick={() => navigate('/shipping')}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Add Your First Address
                        </button>
                    </div>
                )}
            </div>
        </AccountLayout>
    );
}

export default Profile;

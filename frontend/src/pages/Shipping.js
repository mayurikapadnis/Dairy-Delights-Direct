import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountLayout from '../components/AccountLayout';
import { MapPin, Plus, Edit2, Trash2, Home as HomeIcon, Briefcase, Check } from 'lucide-react';

function Shipping() {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        type: 'Home',
        name: '',
        phone: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        // Fetch user profile which includes addresses
        fetch('http://localhost:5000/api/users/profile', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.addresses) {
                    setAddresses(data.addresses);
                }
            })
            .catch((err) => console.error(err));
    }, [navigate, userInfo]);

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const isUpdate = newAddress._id;
            const url = isUpdate
                ? `http://localhost:5000/api/users/address/${newAddress._id}`
                : 'http://localhost:5000/api/users/address';

            const response = await fetch(url, {
                method: isUpdate ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify(newAddress),
            });
            const data = await response.json();
            // Backend returns the updated addresses array
            setAddresses(data);
            setNewAddress({
                type: 'Home',
                name: '',
                phone: '',
                street: '',
                landmark: '',
                city: '',
                state: '',
                zip: '',
                country: 'India'
            });
            setShowAddForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditAddress = (addr) => {
        setNewAddress({
            type: addr.type || 'Home',
            name: addr.name || '',
            phone: addr.phone || '',
            street: addr.street || '',
            landmark: addr.landmark || '',
            city: addr.city || '',
            state: addr.state || '',
            zip: addr.zip || '',
            country: addr.country || 'India',
            _id: addr._id // Store the ID for update
        });
        setShowAddForm(true);
    };

    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/users/address/${addressId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            const data = await response.json();
            setAddresses(data);
            // Clear selection if deleted address was selected
            if (selectedAddressId !== null && addresses[selectedAddressId]?._id === addressId) {
                setSelectedAddressId(null);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to delete address');
        }
    };

    const proceedToPayment = () => {
        const selectedAddress = addresses.find((_, idx) => idx === selectedAddressId);
        if (!selectedAddress) {
            alert('Please select a delivery address');
            return;
        }
        localStorage.setItem('shippingAddress', JSON.stringify(selectedAddress));
        navigate('/payment');
    };

    return (
        <AccountLayout>
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <MapPin className="w-8 h-8 text-green-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Manage Addresses</h1>
                            <p className="text-gray-500 text-sm mt-1">Add, edit, or select delivery addresses</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center space-x-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{showAddForm ? 'Cancel' : 'Add New Address'}</span>
                    </button>
                </div>

                {/* Add Address Form */}
                {showAddForm && (
                    <div className="mb-8 bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">
                            {newAddress._id ? 'Edit Address' : 'New Delivery Address'}
                        </h3>
                        <form onSubmit={handleAddAddress} className="space-y-5">
                            {/* Address Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address Type *</label>
                                <div className="flex space-x-3">
                                    {['Home', 'Office', 'Other'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setNewAddress({ ...newAddress, type })}
                                            className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition ${newAddress.type === type
                                                ? 'border-green-600 bg-green-50 text-green-700'
                                                : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        value={newAddress.name}
                                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter recipient name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        value={newAddress.phone}
                                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="10-digit mobile number"
                                        pattern="[0-9]{10}"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Full Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">House No., Building, Street *</label>
                                <input
                                    type="text"
                                    value={newAddress.street}
                                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g. 123, Shivaji Nagar, MG Road"
                                    required
                                />
                            </div>

                            {/* Landmark */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
                                <input
                                    type="text"
                                    value={newAddress.landmark}
                                    onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g. Near City Mall, Opposite Metro Station"
                                />
                            </div>

                            {/* City, State, Pincode */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                    <input
                                        type="text"
                                        value={newAddress.city}
                                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Mumbai"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                    <input
                                        type="text"
                                        value={newAddress.state}
                                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Maharashtra"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                                    <input
                                        type="text"
                                        value={newAddress.zip}
                                        onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="400001"
                                        pattern="[0-9]{6}"
                                        maxLength="6"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="flex-1 md:flex-none px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 md:flex-none px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-md"
                                >
                                    {newAddress._id ? 'Update Address' : 'Save Address'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Address List */}
                {addresses.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No addresses saved</h3>
                        <p className="text-gray-500 mb-6">Add your first delivery address to get started</p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                        >
                            Add Address
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {addresses.map((addr, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedAddressId(idx)}
                                    className={`relative group cursor-pointer border-2 rounded-xl p-6 transition-all duration-200 ${selectedAddressId === idx
                                        ? 'border-green-500 bg-green-50 shadow-lg'
                                        : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                                        }`}
                                >
                                    {/* Selected Indicator */}
                                    {selectedAddressId === idx && (
                                        <div className="absolute top-4 right-4 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    )}

                                    {/* Address Type Badge */}
                                    <div className="flex items-center space-x-2 mb-4">
                                        <span className={`flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-full ${selectedAddressId === idx
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}>
                                            <HomeIcon className="w-3 h-3" />
                                            <span>HOME</span>
                                        </span>
                                    </div>

                                    {/* Address Details */}
                                    <div className="flex items-start space-x-3">
                                        <MapPin className={`w-5 h-5 mt-1 flex-shrink-0 ${selectedAddressId === idx ? 'text-green-600' : 'text-gray-400'
                                            }`} />
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {addr.street}
                                                <br />
                                                {addr.city}, {addr.state} - {addr.zip}
                                                <br />
                                                {addr.country}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditAddress(addr);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium flex items-center justify-center space-x-2"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteAddress(addr._id);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium flex items-center justify-center space-x-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Proceed Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={proceedToPayment}
                                disabled={selectedAddressId === null}
                                className={`px-8 py-4 font-bold rounded-xl transition shadow-lg ${selectedAddressId !== null
                                    ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-xl'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Deliver to This Address
                            </button>
                        </div>
                    </>
                )}
            </div>
        </AccountLayout>
    );
}

export default Shipping;

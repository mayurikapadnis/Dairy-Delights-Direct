import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Plus } from 'lucide-react';

function Shipping() {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'India'
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=shipping');
            return;
        }
        // Fetch addresses from backend
        fetchAddresses();
    }, [navigate]);

    const fetchAddresses = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            const data = await res.json();
            if (data.addresses) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]._id);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/users/address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify(formData),
            });
            const updatedAddresses = await res.json();
            setAddresses(updatedAddresses);
            setShowForm(false);
            // Select the newly added address
            if (updatedAddresses.length > 0) {
                setSelectedAddress(updatedAddresses[updatedAddresses.length - 1]._id);
            }
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const proceedToPayment = () => {
        if (!selectedAddress) {
            alert('Please select a delivery address');
            return;
        }

        // Find the full address object
        const addressToSave = addresses.find(addr => addr._id === selectedAddress);
        if (addressToSave) {
            localStorage.setItem('shippingAddress', JSON.stringify(addressToSave));
            navigate('/payment');
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-10 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-2xl font-bold mb-6 flex items-center">
                        <MapPin className="mr-2 text-green-600" /> Select Delivery Address
                    </h1>

                    {/* Saved Addresses */}
                    <div className="space-y-4 mb-8">
                        {addresses.map((addr) => (
                            <div
                                key={addr._id}
                                className={`border p-4 rounded-lg cursor-pointer flex items-start transition ${selectedAddress === addr._id ? 'border-green-600 bg-green-50 ring-1 ring-green-600' : 'border-gray-200 hover:border-green-300'}`}
                                onClick={() => setSelectedAddress(addr._id)}
                            >
                                <div className={`w-5 h-5 rounded-full border mr-4 flex-shrink-0 flex items-center justify-center ${selectedAddress === addr._id ? 'border-green-600' : 'border-gray-300'}`}>
                                    {selectedAddress === addr._id && <div className="w-3 h-3 bg-green-600 rounded-full" />}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{userInfo.name}</p>
                                    <p className="text-gray-600">{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p>
                                    <p className="text-gray-600">{addr.country}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!showForm ? (
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center text-green-700 font-semibold hover:bg-green-50 px-4 py-2 rounded transition mb-6"
                        >
                            <Plus className="w-5 h-5 mr-1" /> Add New Address
                        </button>
                    ) : (
                        <form onSubmit={handleAddAddress} className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                            <h3 className="font-bold mb-4 text-gray-700">Add New Address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text" placeholder="Street Address" required
                                    className="p-3 border rounded w-full md:col-span-2"
                                    value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="City" required
                                    className="p-3 border rounded w-full"
                                    value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="State" required
                                    className="p-3 border rounded w-full"
                                    value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="ZIP Code" required
                                    className="p-3 border rounded w-full"
                                    value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                />
                                <select
                                    className="p-3 border rounded w-full"
                                    value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })}
                                >
                                    <option>India</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700">Save Address</button>
                            </div>
                        </form>
                    )}

                    <button
                        onClick={proceedToPayment}
                        className="w-full bg-orange-500 text-white py-4 rounded font-bold hover:bg-orange-600 shadow-md transition text-lg uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedAddress}
                    >
                        Deliver Here
                    </button>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Shipping;

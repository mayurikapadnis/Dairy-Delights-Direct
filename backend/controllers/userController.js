import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            addresses: user.addresses,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
            addresses: updatedUser.addresses
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Add address
// @route   POST /api/users/address
// @access  Private
const addAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const address = req.body;
        user.addresses.push(address);
        await user.save();
        res.json(user.addresses);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update address
// @route   PUT /api/users/address/:id
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const addressIndex = user.addresses.findIndex(
            addr => addr._id.toString() === req.params.id
        );

        if (addressIndex !== -1) {
            user.addresses[addressIndex] = {
                ...user.addresses[addressIndex].toObject(),
                ...req.body
            };
            await user.save();
            res.json(user.addresses);
        } else {
            res.status(404);
            throw new Error('Address not found');
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete address
// @route   DELETE /api/users/address/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const addressIndex = user.addresses.findIndex(
            addr => addr._id.toString() === req.params.id
        );

        if (addressIndex !== -1) {
            user.addresses.splice(addressIndex, 1);
            await user.save();
            res.json(user.addresses);
        } else {
            res.status(404);
            throw new Error('Address not found');
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { getUserProfile, updateUserProfile, addAddress, updateAddress, deleteAddress };

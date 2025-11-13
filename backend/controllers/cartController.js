import User from '../models/User.js';

export const getCart = async (req, res) => {
  // Assuming Cart is embedded in User schema or elsewhere
  const user = await User.findById(req.user._id).populate('cart.product');
  if (user) res.json(user.cart);
  else res.status(404).json({ message: 'User not found' });
};

export const addToCart = async (req, res) => {
  // Logic for adding product to user cart
};

export const removeFromCart = async (req, res) => {
  // Logic to remove item from user cart
};

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile, addAddress, updateAddress, deleteAddress } from '../controllers/userController.js';

const router = express.Router();

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.post('/address', protect, addAddress);
router.put('/address/:id', protect, updateAddress);
router.delete('/address/:id', protect, deleteAddress);

export default router;


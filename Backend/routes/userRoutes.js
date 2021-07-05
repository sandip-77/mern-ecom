import express from 'express';
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from '../controller/userController.js';
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile')
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile)
router.route('/:id')
        .delete(protect, admin, deleteUser)
        .get(protect, admin, getUserById)
        .put(protect, admin, updateUser)


export default router;
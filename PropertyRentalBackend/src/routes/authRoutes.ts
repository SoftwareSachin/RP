import { Router } from 'express';
import { registerUser, loginUser, updateProfile } from '../controllers/authController.js';

const router = Router();

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// PUT /api/auth/profile
router.put('/profile', updateProfile);

export default router;
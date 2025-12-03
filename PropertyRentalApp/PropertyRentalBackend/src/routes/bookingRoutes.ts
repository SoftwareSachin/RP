import express from 'express';
import { createBooking, getUserBookings } from '../controllers/bookingController';

const router = express.Router();

// All bookings for logged-in user (for now, accept userId in body/query until auth middleware is added)
router.get('/', getUserBookings);

// Create a new booking
router.post('/', createBooking);

export default router;

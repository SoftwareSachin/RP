import { Request, Response } from 'express';
import Booking from '../models/Booking';

// @desc    Create a booking
// @route   POST /api/bookings
export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bookings for a user
// @route   GET /api/bookings?userId=...
export const getUserBookings = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const query: any = {};
    if (userId) query.user = userId;

    const bookings = await Booking.find(query)
      .populate('property')
      .populate('user', 'name email');

    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  property: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  guests: number;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  paymentMethod: string;
  transactionId?: string;
  specialRequests?: string;
  cancellationReason?: string;
  cancelledAt?: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    guests: { type: Number, required: true, min: 1 },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'pending',
    },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String },
    specialRequests: { type: String },
    cancellationReason: { type: String },
    cancelledAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes for faster queries
bookingSchema.index({ property: 1 });
bookingSchema.index({ user: 1 });
bookingSchema.index({ startDate: 1, endDate: 1 });

export default mongoose.model<IBooking>('Booking', bookingSchema);

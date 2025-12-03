import { Request, Response } from 'express';
import Property from '../models/Property';

// @desc    Get all properties
// @route   GET /api/properties
export const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a property
// @route   POST /api/properties
export const createProperty = async (req: Request, res: Response) => {
  try {
    // In a real app, you would get ownerId from the authenticated token
    // const ownerId = req.user._id; 
    
    const { 
      title, type, price, location, specs, amenities, images, ownerName, contactNumber 
    } = req.body;

    // Construct priceDisplay for UI consistency (e.g. 25000 -> "25k")
    const priceDisplay = price >= 1000 ? `${(price/1000).toFixed(0)}k` : price.toString();

    const property = new Property({
      title,
      type,
      price,
      priceDisplay,
      location,
      specs,
      amenities,
      images: images || ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800"], // Default image
      isFeatured: true // New listings featured by default for demo
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
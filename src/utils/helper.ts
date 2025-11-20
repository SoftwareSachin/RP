// src/utils/helpers.ts
import { Property } from '../types/property';

// Format price with commas
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

// Get the first image from property images
export const getMainImage = (property: Property): string => {
  return property.images?.[0] || 'https://via.placeholder.com/400x300';
};

// Format date to a readable string
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Truncate text to a certain length
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};
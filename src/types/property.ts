export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  images: string[];
  rating: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isFavorite: boolean;
  isFeatured?: boolean;
  description?: string;
  amenities?: string[];
}

// src/services/api.ts
import { Property } from '../types/property';

// Mock API service - in a real app, this would be actual API calls
const API_BASE_URL = 'https://api.propertyrental.com/v1';

export const propertyService = {
  // Fetch all properties
  getProperties: async (): Promise<Property[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(require('../mock/properties.json'));
      }, 500);
    });
  },

  // Fetch a single property by ID
  getPropertyById: async (id: string): Promise<Property | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(async () => {
        const properties = await propertyService.getProperties();
        const property = properties.find(p => p.id === id) || null;
        resolve(property);
      }, 300);
    });
  },

  // Search properties
  searchProperties: async (query: string): Promise<Property[]> => {
    // Simulate API call with search
    return new Promise((resolve) => {
      setTimeout(async () => {
        const properties = await propertyService.getProperties();
        const filtered = properties.filter(
          p => p.title.toLowerCase().includes(query.toLowerCase()) ||
               p.location.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  },

  // Toggle favorite status
  toggleFavorite: async (id: string): Promise<boolean> => {
    // In a real app, this would update the favorite status on the server
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
  }
};

export const authService = {
  login: async (email: string, password: string) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            name: 'John Doe',
            email,
            token: 'mock-jwt-token'
          }
        });
      }, 500);
    });
  },

  register: async (userData: any) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '2',
            ...userData,
            token: 'mock-jwt-token'
          }
        });
      }, 500);
    });
  },

  logout: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
  }
};

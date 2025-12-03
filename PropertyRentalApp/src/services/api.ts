// src/services/api.ts
import { Platform } from 'react-native';
import { Property } from '../types/property';
import { User, AuthResponse, LoginCredentials, RegisterData } from '../types/user';

// Mock API service - in a real app, this would be actual API calls
const API_HOST = '192.168.1.200'; // Your PC's LAN IP
const API_BASE_URL = `http://${API_HOST}:5000/api`;

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
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error((data && data.message) || 'Login failed');
    }

    const user: User = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      token: data.token,
    };

    return { user, token: data.token };
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error((data && data.message) || 'Registration failed');
    }

    const user: User = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      token: data.token,
    };

    return { user, token: data.token };
  },

  logout: async (): Promise<void> => {
    return Promise.resolve();
  }
};

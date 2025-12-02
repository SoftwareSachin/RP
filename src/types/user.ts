export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  avatar?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  address?: string;
  favorites?: string[]; // Array of property IDs
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

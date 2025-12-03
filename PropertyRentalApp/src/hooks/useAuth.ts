// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { User, AuthState, LoginCredentials, RegisterData } from '../types/user';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In a real app, you would check for an existing session/token
        // For now, we'll just set to not authenticated
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: 'Failed to check authentication status',
        });
      }
    };

    checkAuthStatus();
  }, []);

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user } = await authService.login({ email, password });
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const register = useCallback(async (userData: RegisterData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user } = await authService.register(userData);
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!authState.user) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      // authService.updateProfile will be implemented in src/services/api.ts
      const { user } = await (authService as any).updateProfile(authState.user.token, updates);
      setAuthState(prev => ({
        ...prev,
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      }));
      return { success: true, user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, [authState.user]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [navigation]);

  return {
    ...authState,
    login,
    register,
    updateProfile,
    logout,
  };
};

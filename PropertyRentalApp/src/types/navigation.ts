// src/types/navigation.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  
  // Main Stack
  Main: undefined;
  Home: undefined;
  Profile: undefined;
  PropertyDetail: { propertyId: string };
  
  // Other screens
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};

// Export all navigation prop types
export type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
export type ForgotPasswordNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type PropertyDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PropertyDetail'>;

// Export all screen props
export interface LoginScreenProps {
  navigation: AuthScreenNavigationProp;
}

export interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

export interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordNavigationProp;
}

export interface PropertyDetailScreenProps {
  navigation: PropertyDetailScreenNavigationProp;
  route: {
    params: {
      propertyId: string;
    };
  };
}
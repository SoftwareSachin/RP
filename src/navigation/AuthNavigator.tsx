// src/navigation/AuthNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from './types';
import IPhone1642 from '../screens/auth/IPhone1642';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="IPhone1642"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
        gestureEnabled: false,
      }}
    >
      <Stack.Screen 
        name="IPhone1642" 
        component={IPhone1642}
      />
      <Stack.Screen 
        name="Login" 
        component={Login}
      />
      <Stack.Screen 
        name="Register" 
        component={Register}
      />
    </Stack.Navigator>
  );
}
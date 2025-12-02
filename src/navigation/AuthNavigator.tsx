// src/navigation/AuthNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from './types';
import IPhone1642 from '../screens/auth/IPhone1642';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import MobileLogin from '../screens/auth/mobilelogin';
import Verification from '../screens/auth/Verification';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeRent from '../screens/auth/HomeRent';
import PropertyList from '../screens/auth/PropertyList';
import Lists from '../screens/auth/Lists';
import VisitScheduled from '../screens/auth/VisitScheduled';
import ThankYou from '../screens/auth/ThankYou';
import Saved from '../screens/auth/Saved';
import Saved1 from '../screens/auth/Saved1';
import Payment from '../screens/auth/Payment';
import MonthlyRent from '../screens/auth/MonthlyRent';
import PaymentHistory from '../screens/auth/PaymentHistory';
import TransactionSuccess from '../screens/auth/TransactionSuccess';
import Account from '../screens/auth/Account';
import FilterScreen from '../screens/auth/FilterScreen';
import OccupiedProperty from '../screens/auth/OccupiedProperty';
import PoliceVerification from '../screens/auth/PoliceVerification';
import IPhone1647 from '../screens/auth/IPhone1647';
import PersonalInfo from '../screens/auth/PersonalInfo';

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
      <Stack.Screen 
        name="MobileLogin" 
        component={MobileLogin}
      />
      <Stack.Screen 
        name="Verification" 
        component={Verification}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="HomeRent" 
        component={HomeRent}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="PropertyList" 
        component={PropertyList}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Lists" 
        component={Lists}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="VisitScheduled" 
        component={VisitScheduled}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="ThankYou" 
        component={ThankYou}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Saved" 
        component={Saved}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Saved1" 
        component={Saved1}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="PaymentHistory" 
        component={PaymentHistory}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="MonthlyRent" 
        component={MonthlyRent}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Payment" 
        component={Payment}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="TransactionSuccess" 
        component={TransactionSuccess}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Account" 
        component={Account}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="FilterScreen" 
        component={FilterScreen}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="PersonalInfo" 
        component={PersonalInfo}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={PersonalInfo}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="OccupiedProperty" 
        component={OccupiedProperty}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="PoliceVerification" 
        component={PoliceVerification}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="IPhone1647" 
        component={IPhone1647}
        options={{
          headerShown: false
        }} 
      />
    </Stack.Navigator>
  );
}
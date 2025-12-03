// Update your App.tsx with this content
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

// Import screens
import { HomeScreen } from './src/screens/HomeScreen';
import { PropertyDetailScreen } from './src/screens/PropertyDetailScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import SplashFlowContainer from './src/screens/splash/SplashFlowContainer';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import Lists from './src/screens/auth/Lists';
import HomeRentScreen from './src/screens/auth/HomeRent';
import { AuthProvider } from './src/context/AuthContext';

// Import navigation types
import { RootStackParamList } from './src/types/navigation';

// Create navigators with proper types
type StackParamList = RootStackParamList;
const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Lists') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeRentScreen} />
      <Tab.Screen name="Lists" component={Lists} />
      <Tab.Screen name="Favorites" component={ProfileScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <SafeAreaProvider>
      {showSplash ? (
        <SplashFlowContainer onSplashComplete={handleSplashComplete} />
      ) : (
        <>
          <NavigationContainer>
            <AuthProvider>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#ffffff',
                  },
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerBackTitle: 'Back',
                }}
              >
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{
                    title: 'Create Account',
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPasswordScreen}
                  options={{
                    title: 'Forgot Password',
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="Main"
                  component={MainTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PropertyDetail"
                  component={PropertyDetailScreen}
                  options={{
                    title: 'Property Details',
                  }}
                />
              </Stack.Navigator>
            </AuthProvider>
          </NavigationContainer>
          <StatusBar style="auto" />
        </>
      )}
    </SafeAreaProvider>
  );
}
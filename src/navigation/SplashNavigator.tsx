import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

// Import all splash screens
import IPhone1661 from '../screens/splash/IPhone1661';
import IPhone1660 from '../screens/splash/IPhone1660';
import IPhone1641 from '../screens/splash/IPhone1641';
import IPhone1616 from '../screens/splash/IPhone1616';
import IPhone1618 from '../screens/splash/IPhone1618';
import IPhone1617 from '../screens/splash/IPhone1617';
import IPhone1619 from '../screens/splash/IPhone1619';
import { AuthNavigator } from './AuthNavigator';


const Stack = createStackNavigator();

interface SplashNavigatorProps {
  onSplashComplete?: () => void;
}

export function SplashNavigator({ onSplashComplete }: SplashNavigatorProps) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  
  const splashScreens = [
    { name: 'IPhone1661', component: IPhone1661, duration: 3000 },
    { name: 'IPhone1660', component: IPhone1660, duration: 3000 },
    { name: 'IPhone1641', component: IPhone1641, duration: 3000 },
    { name: 'IPhone1616', component: IPhone1616, duration: 3000 },
    { name: 'IPhone1618', component: IPhone1618, duration: 3000 },
    { name: 'IPhone1617', component: IPhone1617, duration: 3000 },
    { name: 'IPhone1619', component: IPhone1619, duration: 3000 },
    { name: 'Auth', component: AuthNavigator, isNavigator: true },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScreenIndex < splashScreens.length - 1) {
        setCurrentScreenIndex(currentScreenIndex + 1);
      } else {
        onSplashComplete?.();
      }
    }, splashScreens[currentScreenIndex].duration);

    return () => clearTimeout(timer);
  }, [currentScreenIndex, onSplashComplete]);

  const CurrentScreen = splashScreens[currentScreenIndex];

  if (CurrentScreen.isNavigator) {
    const ScreenComponent = CurrentScreen.component;
    return <ScreenComponent />;
  }

  return (
    <View style={styles.container}>
      <CurrentScreen.component />
    </View>
  );
}

// Stack Navigator implementation
export function StackSplashNavigator({ onSplashComplete }: SplashNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="IPhone1661" component={IPhone1661} />
      <Stack.Screen name="IPhone1660" component={IPhone1660} />
      <Stack.Screen name="IPhone1641" component={IPhone1641} />
      <Stack.Screen name="IPhone1616" component={IPhone1616} />
      <Stack.Screen name="IPhone1618" component={IPhone1618} />
      <Stack.Screen name="IPhone1617" component={IPhone1617} />
      <Stack.Screen name="IPhone1619" component={IPhone1619} />
      <Stack.Screen 
        name="Auth" 
        component={AuthNavigator}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

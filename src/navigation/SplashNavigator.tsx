import React, { useEffect, useState } from 'react';
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

// Import all splash screens
import IPhone1661 from '../screens/splash/IPhone1661';
import splash_2 from '../screens/splash/splash_2';
import Splash_3 from '../screens/splash/Splash_3';
import Onboarding_1 from '../screens/splash/Onboarding_1';
import Onboarding from '../screens/splash/Onboarding';
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
    { name: 'splash_2', component: splash_2, duration: 3000 },
    { name: 'Splash_3', component: Splash_3, duration: 3000 },
    { name: 'Onboarding_1', component: Onboarding_1, duration: 3000 },
    { name: 'Onboarding', component: Onboarding, duration: 3000 },
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

// Custom transition configuration
const forFade: StackCardStyleInterpolator = ({ current, next }) => {
  const opacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return {
    cardStyle: {
      opacity,
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
    },
  };
};

// Stack Navigator implementation
export function StackSplashNavigator({ onSplashComplete }: SplashNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: forFade,
        cardOverlayEnabled: true,
      }}
    >
      <Stack.Screen name="IPhone1661" component={IPhone1661} />
      <Stack.Screen name="splash_2" component={splash_2} />
      <Stack.Screen name="Splash_3" component={Splash_3} />
      <Stack.Screen name="Onboarding_1" component={Onboarding_1} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
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

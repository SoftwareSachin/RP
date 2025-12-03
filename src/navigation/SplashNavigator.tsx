import React, { useEffect, useState } from 'react';
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

// Import all splash screens
import Splash_1 from '../screens/splash/Splash_1';
import splash_2 from '../screens/splash/splash_2';
import Splash_3 from '../screens/splash/Splash_3';
import Onboarding_1 from '../screens/splash/Onboarding_1';
import Onboarding_2 from '../screens/splash/Onboarding_2';
import Onboarding_3 from '../screens/splash/Onboarding_3';
import Onboarding_4 from '../screens/splash/Onboarding_4';
import { AuthNavigator } from './AuthNavigator';


const Stack = createStackNavigator();

interface SplashNavigatorProps {
  onSplashComplete?: () => void;
}

export function SplashNavigator({ onSplashComplete }: SplashNavigatorProps) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  
  const splashScreens = [
    { name: 'Splash_1', component: Splash_1, duration: 3000 },
    { name: 'splash_2', component: splash_2, duration: 3000 },
    { name: 'Splash_3', component: Splash_3, duration: 3000 },
    { name: 'Onboarding_1', component: Onboarding_1, duration: 3000 },
    { name: 'Onboarding_2', component: Onboarding_2, duration: 3000 },
    { name: 'Onboarding_3', component: Onboarding_3, duration: 3000 },
    { name: 'Onboarding_4', component: Onboarding_4, duration: 3000 },
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
      <Stack.Screen name="Splash_1" component={Splash_1} />
      <Stack.Screen name="splash_2" component={splash_2} />
      <Stack.Screen name="Splash_3" component={Splash_3} />
      <Stack.Screen name="Onboarding_1" component={Onboarding_1} />
      <Stack.Screen name="Onboarding_2" component={Onboarding_2} />
      <Stack.Screen name="Onboarding_3" component={Onboarding_3} />
      <Stack.Screen name="Onboarding_4" component={Onboarding_4} />
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

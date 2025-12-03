import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Onboarding_3 from './Onboarding_3';
import Splash_3 from './Splash_3';
import splash_2 from './splash_2';
import Splash_1 from './Splash_1';

interface Props {
  onSplashComplete: () => void;
}

const splashScreens = [
  { component: Splash_1, duration: 2000 },
  { component: splash_2, duration: 2000 },
  { component: Splash_3, duration: 2000 },
  { component: Onboarding_3, duration: 3000 },
];

export default function SplashLoader({ onSplashComplete }: Props) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  useEffect(() => {
    if (currentScreenIndex < splashScreens.length) {
      const timer = setTimeout(() => {
        if (currentScreenIndex === splashScreens.length - 1) {
          // Last screen completed, call onSplashComplete
          onSplashComplete();
        } else {
          // Move to next screen
          setCurrentScreenIndex(currentScreenIndex + 1);
        }
      }, splashScreens[currentScreenIndex].duration);

      return () => clearTimeout(timer);
    }
  }, [currentScreenIndex, onSplashComplete]);

  const CurrentSplashComponent = splashScreens[currentScreenIndex]?.component;

  if (!CurrentSplashComponent) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CurrentSplashComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

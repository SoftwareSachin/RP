import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import all splash screens
import splash_2 from './splash_2';
import Splash_3 from './Splash_3';
import Onboarding_1 from './Onboarding_1';
import Onboarding_2 from './Onboarding_2';
import Onboarding_3 from './Onboarding_3';
import Onboarding_4 from './Onboarding_4';

interface Props {
  onComplete?: () => void;
  onSplashComplete?: () => void; // Add this for compatibility
}

export default function SplashFlow({ onComplete, onSplashComplete }: Props) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const navigation = useNavigation();
  
  const splashScreens = [
    { name: 'splash_2', component: splash_2, duration: 3000 },
    { name: 'Splash_3', component: Splash_3, duration: 3000 },
    { name: 'Onboarding_1', component: Onboarding_1, duration: 3000 },
    { name: 'Onboarding_2', component: Onboarding_2, duration: 3000 },
    { name: 'Onboarding_3', component: Onboarding_3, duration: 3000 },
    { name: 'Onboarding_4', component: Onboarding_4, duration: 3000 },
  ];

  const handleComplete = () => {
    onComplete?.();
    onSplashComplete?.();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScreenIndex < splashScreens.length - 1) {
        setCurrentScreenIndex(currentScreenIndex + 1);
      } else {
        handleComplete();
      }
    }, splashScreens[currentScreenIndex].duration);

    return () => clearTimeout(timer);
  }, [currentScreenIndex, handleComplete]);

  const CurrentScreen = splashScreens[currentScreenIndex].component;

  return (
    <View style={styles.container}>
      <CurrentScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

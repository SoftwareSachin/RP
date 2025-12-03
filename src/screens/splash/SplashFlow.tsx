import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import all splash screens
import splash_2 from './splash_2';
import Splash_3 from './Splash_3';
import Onboarding_1 from './Onboarding_1';
import Onboarding from './Onboarding';
import IPhone1617 from './IPhone1617';
import IPhone1619 from './IPhone1619';

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
    { name: 'Onboarding', component: Onboarding, duration: 3000 },
    { name: 'IPhone1617', component: IPhone1617, duration: 3000 },
    { name: 'IPhone1619', component: IPhone1619, duration: 3000 },
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

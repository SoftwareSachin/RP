import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import IPhone1617 from './IPhone1617';
import IPhone1641 from './IPhone1641';
import IPhone1660 from './IPhone1660';
import IPhone1661 from './IPhone1661';

interface Props {
  onSplashComplete: () => void;
}

const splashScreens = [
  { component: IPhone1661, duration: 2000 },
  { component: IPhone1660, duration: 2000 },
  { component: IPhone1641, duration: 2000 },
  { component: IPhone1617, duration: 3000 },
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

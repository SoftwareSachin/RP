import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import all splash screens
import IPhone1660 from './IPhone1660';
import IPhone1641 from './IPhone1641';
import IPhone1616 from './IPhone1616';
import IPhone1618 from './IPhone1618';
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
    { name: 'IPhone1660', component: IPhone1660, duration: 3000 },
    { name: 'IPhone1641', component: IPhone1641, duration: 3000 },
    { name: 'IPhone1616', component: IPhone1616, duration: 3000 },
    { name: 'IPhone1618', component: IPhone1618, duration: 3000 },
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

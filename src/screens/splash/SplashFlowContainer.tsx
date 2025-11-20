import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Import all splash screens
import IPhone1660 from './IPhone1660';
import IPhone1641 from './IPhone1641';
import IPhone1616 from './IPhone1616';
import IPhone1618 from './IPhone1618';
import IPhone1617 from './IPhone1617';
import IPhone1619 from './IPhone1619';

interface Props {
  onSplashComplete?: () => void;
}

export default function SplashFlowContainer({ onSplashComplete }: Props) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  
  const splashScreens = [
    { name: 'IPhone1660', component: IPhone1660, duration: 3000 },
    { name: 'IPhone1641', component: IPhone1641, duration: 3000 },
    { name: 'IPhone1616', component: IPhone1616 },
    { name: 'IPhone1618', component: IPhone1618 },
    { name: 'IPhone1617', component: IPhone1617 },
    { name: 'IPhone1619', component: IPhone1619 },
  ];

  console.log('Current screen index:', currentScreenIndex);
  console.log('Current screen:', splashScreens[currentScreenIndex]?.name);

  useEffect(() => {
    const currentScreen = splashScreens[currentScreenIndex];
    
    // Skip auto-advance for screens without duration (user-controlled)
    if (!currentScreen.duration) {
      return;
    }
    
    const timer = setTimeout(() => {
      if (currentScreenIndex < splashScreens.length - 1) {
        setCurrentScreenIndex(currentScreenIndex + 1);
      } else {
        onSplashComplete?.();
      }
    }, currentScreen.duration);

    return () => clearTimeout(timer);
  }, [currentScreenIndex, onSplashComplete]);

  const CurrentScreen = splashScreens[currentScreenIndex].component;
  const isIPhone1616 = splashScreens[currentScreenIndex].name === 'IPhone1616';
  const isIPhone1618 = splashScreens[currentScreenIndex].name === 'IPhone1618';
  const isIPhone1617 = splashScreens[currentScreenIndex].name === 'IPhone1617';
  const isIPhone1619 = splashScreens[currentScreenIndex].name === 'IPhone1619';
  
  console.log('Rendering screen:', splashScreens[currentScreenIndex].name, 'Index:', currentScreenIndex);
  
  const handleNext = () => {
    console.log('Next pressed, current index:', currentScreenIndex);
    if (currentScreenIndex < splashScreens.length - 1) {
      setCurrentScreenIndex(currentScreenIndex + 1);
    } else {
      onSplashComplete?.();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ position: 'absolute', top: 50, left: 20, zIndex: 999, backgroundColor: 'red', color: 'white', padding: 5 }}>
        SplashFlow: {splashScreens[currentScreenIndex].name}
      </Text>
      {isIPhone1616 || isIPhone1618 || isIPhone1617 || isIPhone1619 ? (
        <CurrentScreen onNext={handleNext} />
      ) : (
        <CurrentScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

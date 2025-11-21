import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Import all splash screens
import IPhone1660 from './IPhone1660';
import IPhone1641 from './IPhone1641';
import { AuthNavigator } from '../../navigation/AuthNavigator';
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
    { 
      name: 'Auth', 
      component: () => (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      ), 
      isNavigator: true 
    },
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

  const CurrentScreen = splashScreens[currentScreenIndex];
  
  console.log('Rendering screen:', CurrentScreen.name, 'Index:', currentScreenIndex);
  
  const handleNext = () => {
    console.log('Next pressed, current index:', currentScreenIndex);
    if (currentScreenIndex < splashScreens.length - 1) {
      // If next screen is the Auth navigator, make sure we're at the correct screen index
      const nextIndex = currentScreenIndex + 1;
      setCurrentScreenIndex(nextIndex);
      
      // If the next screen is the Auth navigator, we don't need to do anything else
      // as it will be handled by the navigation stack
    } else {
      onSplashComplete?.();
    }
  };

  // If the current screen is a navigator (like AuthNavigator), render it directly
  if (CurrentScreen.isNavigator) {
    const ScreenComponent = CurrentScreen.component;
    return <ScreenComponent />;
  }

  return (
    <View style={styles.container}>
      <Text style={{ position: 'absolute', top: 50, left: 20, zIndex: 999, backgroundColor: 'red', color: 'white', padding: 5 }}>
        SplashFlow: {splashScreens[currentScreenIndex].name}
      </Text>
      <CurrentScreen.component onNext={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

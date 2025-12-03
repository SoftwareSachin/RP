import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Import all splash screens
import splash_2 from './splash_2';
import Splash_3 from './Splash_3';
import { AuthNavigator } from '../../navigation/AuthNavigator';
import Onboarding_1 from './Onboarding_1';
import Onboarding_2 from './Onboarding_2';
import Onboarding_3 from './Onboarding_3';
import Onboarding_4 from './Onboarding_4';
import { AuthProvider } from '../../context/AuthContext';

interface Props {
  onSplashComplete?: () => void;
}

export default function SplashFlowContainer({ onSplashComplete }: Props) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  
  const splashScreens = [
    { name: 'splash_2', component: splash_2, duration: 3000 },
    { name: 'Splash_3', component: Splash_3, duration: 3000 },
    { name: 'Onboarding_1', component: Onboarding_1 },
    { name: 'Onboarding_2', component: Onboarding_2 },
    { name: 'Onboarding_3', component: Onboarding_3 },
    { name: 'Onboarding_4', component: Onboarding_4 },
    { 
      name: 'Auth', 
      component: () => (
        <NavigationContainer>
          <AuthProvider>
            <AuthNavigator />
          </AuthProvider>
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

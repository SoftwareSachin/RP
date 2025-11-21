import React, { useEffect, useRef } from "react";
import { 
  SafeAreaView, 
  View, 
  ImageBackground, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  Alert,
  Animated,
  Easing
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

type IPhone1642NavigationProp = StackNavigationProp<AuthStackParamList, 'IPhone1642'>;

const IPhone1642: React.FC = () => {
  const navigation = useNavigation<IPhone1642NavigationProp>();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(20)).current;
  
  // Separate animation values for each button
  const loginBounce = useRef(new Animated.Value(1)).current;
  const phoneBounce = useRef(new Animated.Value(1)).current;
  const skipBounce = useRef(new Animated.Value(1)).current;
  const registerBounce = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideY, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Button press animation
  const animateButtonPress = (bounceValue: Animated.Value, callback: () => void) => {
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start(callback);
  };
  
  const handleLoginPress = () => {
    animateButtonPress(loginBounce, () => {
      try {
        console.log('Navigating to Login screen');
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error navigating to Login:', error);
        Alert.alert('Error', 'Failed to navigate to Login screen');
      }
    });
  };

  const handleRegisterPress = () => {
    animateButtonPress(registerBounce, () => {
      try {
        console.log('Navigating to Register screen');
        navigation.navigate('Register');
      } catch (error) {
        console.error('Error navigating to Register:', error);
        Alert.alert('Error', 'Failed to navigate to Register screen');
      }
    });
  };

  const handlePhonePress = () => {
    animateButtonPress(phoneBounce, () => {
      try {
        console.log('Navigating to Mobile Login screen');
        navigation.navigate('MobileLogin');
      } catch (error) {
        console.error('Error navigating to Mobile Login:', error);
        Alert.alert('Error', 'Failed to navigate to Mobile Login screen');
      }
    });
  };

  const handleSkipPress = () => {
    animateButtonPress(skipBounce, () => {
      Alert.alert('Info', 'Skipping for now');
    });
  };

  return (
    <SafeAreaView style={styles.container} testID="iphone1642-screen">
      <ImageBackground 
        source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/3dab4ya8_expires_30_days.png"}} 
        resizeMode="stretch"
        style={styles.backgroundImage}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideY }]
              }
            ]}
          >
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/jvyiaa5r_expires_30_days.png"}} 
              resizeMode="contain"
              style={styles.logoImage}
              accessibilityLabel="App Logo"
            />
          </Animated.View>

          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideY }]
              }
            ]}
          >
            <Animated.View style={{ transform: [{ scale: loginBounce }] }}>
              <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={handleLoginPress}
                activeOpacity={0.8}
                accessibilityLabel="Login with email"
                testID="login-button"
              >
                <Text style={styles.buttonText}>Login via Email</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <Animated.View 
            style={[
              styles.dividerContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideY }]
              }
            ]}
          >
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </Animated.View>

          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideY }]
              }
            ]}
          >
            <Animated.View style={{ transform: [{ scale: phoneBounce }] }}>
              <TouchableOpacity 
                style={styles.secondaryButton} 
                onPress={handlePhonePress}
                activeOpacity={0.8}
                accessibilityLabel="Continue with phone number"
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Continue via Phone number</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <Animated.View style={{ transform: [{ scale: registerBounce }] }}>
              <TouchableOpacity 
                onPress={handleRegisterPress}
                accessibilityLabel="Navigate to registration"
                testID="register-button"
              >
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Animated.View style={[styles.skipButton, { transform: [{ scale: skipBounce }] }]}>
            <TouchableOpacity 
              onPress={handleSkipPress}
              accessibilityLabel="Skip for now"
              style={{ width: '100%', alignItems: 'center' }}
            >
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  logoContainer: {
    width: '100%',
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
  },
  logoImage: {
    height: 400,
    width: '100%',
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    opacity: 0, // Initial state for animation
  },
  primaryButton: {
    backgroundColor: "#F8D800",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#000000',
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#000000",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: "#808080",
    fontSize: 12,
    marginHorizontal: 8,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  registerText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 6,
  },
  registerLink: {
    color: "#B50E00",
    fontSize: 12,
    fontWeight: "bold",
    textDecorationLine: 'underline',
  },
  skipButton: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  skipText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default IPhone1642;
